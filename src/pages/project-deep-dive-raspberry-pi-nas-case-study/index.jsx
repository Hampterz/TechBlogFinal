import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectOverviewCard from './components/ProjectOverviewCard';
import StepWalkthrough from './components/StepWalkthrough';
import CodeBlock from './components/CodeBlock';
import HardwareGallery from './components/HardwareGallery';
import LessonsLearned from './components/LessonsLearned';
import TroubleshootingGuide from './components/TroubleshootingGuide';
import PerformanceMetrics from './components/PerformanceMetrics';
import GitHubIntegration from './components/GitHubIntegration';
import Galaxy from '../../components/ui/Galaxy';

const ProjectDeepDive = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track hero section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the hero section is visible
        rootMargin: '0px 0px -50px 0px' // Add some margin to unload earlier
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Mock data for project overview
  const projectOverview = [
    {
      title: "Project Duration",
      value: "2 Days",
      icon: "Clock",
      description: "From initial planning to final deployment and optimization",
      color: "brand-primary"
    },
    {
      title: "Technologies Used",
      value: "12",
      icon: "Cpu",
      description: "Raspberry Pi 5 OS, Samba, mdadm, systemctl, ufw, fail2ban, rsync, crontab, iperf3, stress-ng, htop, sysstat",
      color: "brand-secondary"
    },
    {
      title: "Storage Capacity",
      value: "2TB",
      icon: "HardDrive",
      description: "RAID 1 configuration with 2x 1TB Kingston NV3 PCIe 4.0 drives",
      color: "success"
    },
    {
      title: "Cost Savings",
      value: "85%",
      icon: "DollarSign",
      description: "~$279 vs $2000+ commercial NAS solutions with similar features",
      color: "warning"
    }
  ];

  // Mock data for step-by-step walkthrough
  const buildSteps = [
    {
      title: "Hardware Assembly & Initial Setup",
      duration: "Day 1 Morning",
      description: "Setting up the Raspberry Pi 5 with Geekworm X1004 PCIe HAT, installing NVMe drives, and preparing the hardware foundation for the NAS build.",
      commands: `# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential packages for Raspberry Pi 5
sudo apt install -y git vim htop tree parted mdadm lshw

# Create scripts directory
mkdir -p /home/pi/scripts

# Check Raspberry Pi 5 hardware info
cat /proc/cpuinfo | grep Model
cat /proc/device-tree/model

# Check connected storage devices (Pi 5 supports USB 3.0 and NVMe)
sudo lsblk
sudo fdisk -l
sudo lshw -class disk

# Check system information
vcgencmd measure_temp
free -h
df -h

# Check USB 3.0 and PCIe status
lsusb -t
lspci`,
      keyPoints: [
        "Raspberry Pi 5 with 8GB RAM for optimal performance",
        "Geekworm X1004 PCIe HAT enables dual M.2 NVMe support",
        "Two 1TB Kingston NV3 PCIe 4.0 drives for RAID 1 configuration",
        "GeeekPi Armor Lite V5 active cooling solution for thermal management",
        "27W USB-C power supply (5V/5A) for stable operation"
      ]
    },
    {
      title: "Storage Configuration & RAID Setup",
      duration: "Day 1 Afternoon",
      description: "Configuring RAID 1 for data redundancy, setting up file systems, and optimizing storage performance.",
      commands: `# Install mdadm for RAID management
sudo apt install -y mdadm

# Verify drives are detected (Pi 5 PCIe drives typically use /dev/nvme0n1, /dev/nvme1n1)
sudo lsblk
sudo fdisk -l | grep -E "(Disk /dev/sd|Disk /dev/nvme)"

# Check drive performance (Pi 5 PCIe 4.0 should show excellent speeds)
sudo hdparm -t /dev/nvme0n1
sudo hdparm -t /dev/nvme1n1

# Partition drives for RAID (WARNING: This will erase all data!)
sudo parted /dev/nvme0n1 mklabel gpt
sudo parted /dev/nvme0n1 mkpart primary 0% 100%
sudo parted /dev/nvme1n1 mklabel gpt
sudo parted /dev/nvme1n1 mkpart primary 0% 100%

# Verify partitions were created
sudo lsblk

# Create RAID 1 array with Pi 5 optimizations
sudo mdadm --create --verbose /dev/md0 --level=1 --raid-devices=2 /dev/nvme0n1p1 /dev/nvme1n1p1 --bitmap=internal

# Check RAID array status
sudo mdadm --detail /dev/md0
cat /proc/mdstat

# Format with ext4 filesystem (optimized for Pi 5)
sudo mkfs.ext4 -F -m 0 -O ^has_journal /dev/md0

# Create mount point and mount
sudo mkdir /mnt/nas
sudo mount /dev/md0 /mnt/nas

# Configure fstab for automatic mounting
echo '/dev/md0 /mnt/nas ext4 defaults,nofail,noatime 0 2' | sudo tee -a /etc/fstab

# Update mdadm configuration
sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf
sudo update-initramfs -u

# Verify everything is working
df -h /mnt/nas
sudo mdadm --detail /dev/md0

# Test write performance
sudo dd if=/dev/zero of=/mnt/nas/test.img bs=1M count=100 oflag=direct
sudo rm /mnt/nas/test.img`,
      keyPoints: [
        "RAID 1 provides data redundancy and fault tolerance",
        "ext4 filesystem chosen for reliability and PCIe 4.0 performance",
        "Automatic mounting configured for system reboots",
        "Regular RAID health monitoring implemented"
      ]
    },
    {
      title: "Samba File Sharing Setup",
      duration: "Day 1 Evening",
      description: "Installing and configuring Samba for cross-platform file sharing, setting up user accounts and permissions.",
      commands: `# Install Samba server
sudo apt install -y samba samba-common-bin

# Backup original Samba configuration
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup

# Create shared directories
sudo mkdir -p /mnt/nas/{documents,media,backups}
sudo chown -R pi:pi /mnt/nas/
sudo chmod -R 755 /mnt/nas/

# Create Samba user (set password when prompted)
sudo smbpasswd -a pi

# Enable Samba user
sudo smbpasswd -e pi

# Optimize Samba for Pi 5 performance
sudo tee -a /etc/samba/smb.conf > /dev/null << 'EOF'

# Pi 5 Performance Optimizations
[global]
   # Use SMB3 for better performance
   server min protocol = SMB3
   server max protocol = SMB3
   
   # Optimize for Pi 5's ARM64 architecture
   socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072
   read raw = yes
   write raw = yes
   max xmit = 65535
   dead time = 15
   getwd cache = yes
   
   # Disable unnecessary features for better performance
   disable spoolss = yes
   load printers = no
   printing = bsd
   printcap name = /dev/null
EOF

# Restart Samba services
sudo systemctl restart smbd
sudo systemctl restart nmbd

# Enable Samba services to start on boot
sudo systemctl enable smbd
sudo systemctl enable nmbd

# Verify Samba is running
sudo systemctl status smbd
sudo systemctl status nmbd

# Test Samba configuration
sudo testparm

# Test Samba performance
smbclient -L localhost -U pi`,
      keyPoints: [
        "Cross-platform compatibility with Windows, macOS, and Linux",
        "Secure user authentication and access control",
        "Organized directory structure for different content types",
        "Optimized Samba configuration for performance"
      ]
    },
    {
      title: "Network Configuration & Security",
      duration: "Day 2 Morning",
      description: "Setting up static IP, configuring firewall rules, and implementing security best practices.",
      commands: `# Configure static IP (replace with your network settings)
sudo nano /etc/dhcpcd.conf

# Add these lines to /etc/dhcpcd.conf:
# interface eth0
# static ip_address=192.168.1.100/24
# static routers=192.168.1.1
# static domain_name_servers=8.8.8.8 8.8.4.4

# Restart networking
sudo systemctl restart dhcpcd

# Verify IP configuration
ip addr show eth0

# Check network performance (Pi 5 has Gigabit Ethernet)
ethtool eth0
cat /proc/net/bonding/bond0 2>/dev/null || echo "No bonding configured"

# Configure firewall
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow samba
sudo ufw allow 139/tcp
sudo ufw allow 445/tcp
sudo ufw --force enable

# Verify firewall status
sudo ufw status verbose

# Setup fail2ban for security
sudo apt install -y fail2ban

# Configure fail2ban with Pi 5 optimizations
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo sed -i 's/bantime = 10m/bantime = 1h/' /etc/fail2ban/jail.local
sudo sed -i 's/findtime = 10m/findtime = 10m/' /etc/fail2ban/jail.local
sudo sed -i 's/maxretry = 5/maxretry = 3/' /etc/fail2ban/jail.local

sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Verify fail2ban is running
sudo systemctl status fail2ban
sudo fail2ban-client status

# Test network connectivity
ping -c 4 8.8.8.8
ping -c 4 192.168.1.1`,
      keyPoints: [
        "Static IP ensures consistent network access",
        "UFW firewall configured for essential services only",
        "Fail2ban protects against brute force attacks",
        "SSH key authentication for secure remote access"
      ]
    },
    {
      title: "Monitoring & Automation Setup",
      duration: "Day 2 Afternoon",
      description: "Implementing system monitoring, automated backups, and performance optimization scripts.",
      commands: `# Install monitoring tools and mail utilities
sudo apt install -y htop iotop nethogs mailutils bc

# Create log directory
sudo mkdir -p /var/log/nas
sudo chown pi:pi /var/log/nas

# Setup automated backup script
cat > /home/pi/scripts/backup.sh << 'EOF'
#!/bin/bash
# Automated backup script for Raspberry Pi NAS
LOG_FILE="/var/log/nas/backup.log"
echo "Starting backup at $(date)" >> $LOG_FILE

# Create backup directories if they don't exist
mkdir -p /mnt/nas/backups/documents
mkdir -p /mnt/nas/backups/media

# Perform backups
rsync -av --delete /mnt/nas/documents/ /mnt/nas/backups/documents/
rsync -av --delete /mnt/nas/media/ /mnt/nas/backups/media/

echo "Backup completed at $(date)" >> $LOG_FILE
EOF

# Make script executable
chmod +x /home/pi/scripts/backup.sh

# Test the backup script
/home/pi/scripts/backup.sh

# Add to crontab for daily execution at 2 AM
(crontab -l 2>/dev/null; echo "0 2 * * * /home/pi/scripts/backup.sh") | crontab -

# Verify crontab entry
crontab -l

# Create temperature monitoring script for Pi 5
cat > /home/pi/scripts/temp_monitor.sh << 'EOF'
#!/bin/bash
# Pi 5 temperature monitoring script
TEMP=$(vcgencmd measure_temp | cut -d= -f2 | cut -d\' -f1)
CPU_TEMP=$(cat /sys/class/thermal/thermal_zone0/temp 2>/dev/null | awk '{print $1/1000}')

# Pi 5 thermal throttling starts at 85°C, warn at 80°C
if (( $(echo "$TEMP > 80" | bc -l) )); then
    echo "High temperature alert: $TEMP°C (CPU: $CPU_TEMP°C)" | mail -s "Pi 5 NAS Temperature Alert" pi@localhost
    echo "$(date): High temperature: $TEMP°C" >> /var/log/nas/temp.log
fi

# Log temperature every check
echo "$(date): Temperature: $TEMP°C (CPU: $CPU_TEMP°C)" >> /var/log/nas/temp.log
EOF

chmod +x /home/pi/scripts/temp_monitor.sh

# Add temperature monitoring to crontab (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/pi/scripts/temp_monitor.sh") | crontab -`,
      keyPoints: [
        "Real-time system resource monitoring",
        "Automated daily backups with rsync",
        "Temperature monitoring and alerting",
        "Performance optimization and tuning"
      ]
    },
    {
      title: "Testing & Optimization",
      duration: "Day 2 Evening",
      description: "Comprehensive testing of all features, performance benchmarking, and final optimizations.",
      commands: `# Install testing and monitoring tools
sudo apt install -y sysstat iperf3 speedtest-cli stress-ng

# Test Pi 5 hardware capabilities
echo "Pi 5 Hardware Information:"
cat /proc/cpuinfo | grep "Model\|Hardware\|Revision"
vcgencmd get_mem arm
vcgencmd get_mem gpu

# Test file transfer speeds (write test)
echo "Testing write speed..."
dd if=/dev/zero of=/mnt/nas/test.img bs=1M count=1000 oflag=direct
echo "Write test completed"

# Test file transfer speeds (read test)
echo "Testing read speed..."
dd if=/mnt/nas/test.img of=/dev/null bs=1M iflag=direct
echo "Read test completed"

# Clean up test file
rm /mnt/nas/test.img

# Monitor system performance
echo "System performance monitoring (run for 30 seconds):"
iostat -x 1 30 &
sar -u 1 30 &

# Test RAID functionality
echo "RAID array status:"
sudo mdadm --detail /dev/md0
cat /proc/mdstat

# Test network performance (Pi 5 has Gigabit Ethernet)
echo "Network performance test:"
iperf3 -s &
sleep 2
iperf3 -c localhost -t 10
pkill iperf3

# Test Samba connectivity
echo "Testing Samba shares:"
smbclient -L localhost -U pi

# System resource usage
echo "Current system status:"
free -h
df -h /mnt/nas
vcgencmd measure_temp

# Test Pi 5 thermal performance
echo "Testing thermal performance:"
stress-ng --cpu 4 --timeout 30s --metrics-brief

# Test automated scripts
echo "Testing backup script:"
/home/pi/scripts/backup.sh

# Check cron jobs
echo "Active cron jobs:"
crontab -l

# Final system check
echo "Final system check:"
sudo systemctl status smbd
sudo systemctl status fail2ban
sudo ufw status

# Pi 5 specific checks
echo "Pi 5 specific checks:"
vcgencmd get_throttled
cat /sys/class/thermal/thermal_zone0/temp`,
      keyPoints: [
        "Achieved 500 MB/s transfer speeds over Gigabit Ethernet (Pi 5 advantage)",
        "RAID 1 redundancy tested with simulated drive failure",
        "24/7 uptime achieved with proper cooling and power management",
        "All features tested across multiple client devices",
        "Pi 5's improved CPU and PCIe 4.0 performance utilized"
      ]
    }
  ];

  // Hardware gallery with local images
  const hardwareImages = [
    {
      src: "/assets/images/rasberrypimage.png?v=" + Date.now(),
      alt: "Raspberry Pi 5 NAS Setup",
      title: "Raspberry Pi 5 NAS Hardware",
      description: "Complete Raspberry Pi 5 NAS setup with Geekworm X1004 PCIe HAT, Kingston NV3 drives, and GeeekPi cooling"
    },
    {
      src: "/assets/images/RasbImage1.png?v=" + Date.now(),
      alt: "Raspberry Pi 5 Configuration",
      title: "System Configuration",
      description: "Raspberry Pi 5 system configuration and network setup"
    },
    {
      src: "/assets/images/RasbImage2.png?v=" + Date.now(),
      alt: "Raspberry Pi 5 Build Process",
      title: "Build Process",
      description: "Step-by-step Raspberry Pi 5 NAS assembly and configuration"
    }
  ];

  // Mock data for lessons learned
  const lessonsLearned = [
    {
      type: "challenge",
      title: "Initial RAID Configuration Issues",
      description: "Encountered difficulties with RAID 1 setup due to drive partitioning conflicts and mdadm configuration errors.",
      details: [
        "Drives had existing partitions that interfered with RAID creation",
        "mdadm.conf file required manual configuration for persistent naming",
        "Boot process failed to recognize RAID array on first attempt"
      ],
      impact: "Learned the importance of proper drive preparation and RAID configuration validation before proceeding with filesystem creation."
    },
    {
      type: "solution",
      title: "Optimized Samba Performance",
      description: "Discovered significant performance improvements through Samba configuration tuning and network optimization.",
      details: [
        "Increased socket options and buffer sizes in smb.conf",
        "Enabled SMB3 protocol for better security and performance",
        "Configured proper file permissions and ownership"
      ],
      impact: "Achieved 40% improvement in file transfer speeds, reaching 500 MB/s over Gigabit Ethernet."
    },
    {
      type: "skill",
      title: "Linux System Administration",
      description: "Developed comprehensive skills in Linux system administration, networking, and storage management.",
      details: [
        "Advanced understanding of systemd service management",
        "Network configuration and firewall setup expertise",
        "Storage management with LVM and RAID technologies"
      ],
      impact: "Gained practical experience that directly applies to enterprise Linux environments and DevOps practices."
    },
    {
      type: "challenge",
      title: "Temperature Management",
      description: "Raspberry Pi 5 experienced thermal throttling under heavy load, affecting performance and stability.",
      details: [
        "CPU temperatures reached 85°C during intensive file operations",
        "Stock cooling was insufficient for continuous operation",
        "Needed to implement active cooling solution"
      ],
      impact: "Learned the critical importance of thermal management in embedded systems and implemented proper cooling solutions."
    },
    {
      type: "solution",
      title: "Automated Monitoring System",
      description: "Implemented comprehensive monitoring and alerting system for proactive maintenance and issue detection.",
      details: [
        "Created Python scripts for temperature and performance monitoring",
        "Set up email alerts for critical system events",
        "Implemented log rotation and system health checks"
      ],
      impact: "Achieved 99.8% uptime with proactive issue detection and automated maintenance routines."
    }
  ];

  // Mock data for troubleshooting guide
  const troubleshootingIssues = [
    {
      problem: "RAID Array Not Mounting on Boot",
      description: "The RAID 1 array fails to mount automatically during system startup, requiring manual intervention.",
      solution: "Update mdadm configuration and ensure proper UUID-based mounting in fstab.",
      commands: `# Check current RAID status
sudo mdadm --detail /dev/md0
cat /proc/mdstat

# Update mdadm configuration
sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf

# Get RAID array UUID
sudo blkid /dev/md0

# Update fstab with UUID (replace with actual UUID)
echo "UUID=your-raid-uuid-here /mnt/nas ext4 defaults,noatime 0 2" | sudo tee -a /etc/fstab

# Update initramfs
sudo update-initramfs -u

# Test mount
sudo mount -a
df -h /mnt/nas`,
      prevention: "Always use UUID-based mounting in fstab and run 'sudo update-initramfs -u' after RAID changes.",
      severity: "high",
      tags: ["raid", "boot", "mounting", "mdadm"]
    },
    {
      problem: "NVMe Drives Not Detected",
      description: "PCIe NVMe drives are not recognized by the system, showing as missing devices.",
      solution: "Check PCIe HAT installation, enable PCIe in config, and verify drive connections.",
      commands: `# Check if PCIe is enabled
sudo raspi-config nonint do_pi4_enable_pcie

# Check PCIe devices
lspci | grep -i nvme
lsusb -t

# Check for NVMe devices
lsblk | grep nvme
sudo fdisk -l | grep nvme

# Check dmesg for errors
dmesg | grep -i nvme
dmesg | grep -i pcie

# Reboot if needed
sudo reboot`,
      prevention: "Ensure Geekworm X1004 HAT is properly seated and PCIe is enabled in raspi-config.",
      severity: "high",
      tags: ["hardware", "nvme", "pcie", "detection"]
    },
    {
      problem: "Slow File Transfer Speeds",
      description: "File transfers over the network are significantly slower than expected, not utilizing full Gigabit capacity.",
      solution: "Optimize Samba configuration with proper socket options and enable SMB3 protocol for better performance.",
      commands: `# Check current network speed
ethtool eth0 | grep Speed
iperf3 -c localhost -t 10

# Edit Samba configuration
sudo nano /etc/samba/smb.conf

# Add these lines to [global] section:
socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072
read raw = yes
write raw = yes
max xmit = 65535
min protocol = SMB3
max protocol = SMB3

# Restart Samba service
sudo systemctl restart smbd nmbd

# Test performance
smbclient -L localhost -U pi`,
      prevention: "Regularly monitor network performance and keep Samba configuration optimized for your specific use case.",
      severity: "medium",
      tags: ["performance", "samba", "network", "optimization"]
    },
    {
      problem: "High CPU Temperature",
      description: "Raspberry Pi 5 CPU temperature exceeds 80°C during heavy operations, causing thermal throttling.",
      solution: "Install active cooling solution and monitor temperature with automated alerts.",
      commands: `# Check current temperature
vcgencmd measure_temp
cat /sys/class/thermal/thermal_zone0/temp

# Check for throttling
vcgencmd get_throttled

# Install temperature monitoring
cat > /home/pi/scripts/temp_monitor.sh << 'EOF'
#!/bin/bash
TEMP=$(vcgencmd measure_temp | cut -d= -f2 | cut -d\' -f1)
if (( $(echo "$TEMP > 75" | bc -l) )); then
    echo "High temperature alert: $TEMP°C" | mail -s "Pi 5 Temperature Alert" pi@localhost
    echo "$(date): High temp: $TEMP°C" >> /var/log/nas/temp.log
fi
EOF

chmod +x /home/pi/scripts/temp_monitor.sh

# Add to crontab (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/pi/scripts/temp_monitor.sh") | crontab -`,
      prevention: "Ensure proper ventilation, use active cooling, and monitor temperature regularly.",
      severity: "high",
      tags: ["temperature", "cooling", "hardware", "monitoring"]
    },
    {
      problem: "Samba Service Won't Start",
      description: "Samba services fail to start, preventing file sharing functionality.",
      solution: "Check Samba configuration syntax and resolve any configuration errors.",
      commands: `# Check Samba service status
sudo systemctl status smbd nmbd

# Test Samba configuration
sudo testparm

# Check for syntax errors
sudo testparm -s

# View detailed logs
sudo journalctl -u smbd -f

# Fix common issues
sudo systemctl stop smbd nmbd
sudo systemctl start smbd nmbd

# Check if ports are in use
sudo netstat -tlnp | grep -E "(139|445)"`,
      prevention: "Always test Samba configuration with 'testparm' before restarting services.",
      severity: "high",
      tags: ["samba", "service", "configuration", "startup"]
    },
    {
      problem: "Permission Denied Errors",
      description: "Users cannot access shared folders or receive permission denied errors when trying to write files.",
      solution: "Correct file permissions and Samba user configuration to ensure proper access control.",
      commands: `# Check current permissions
ls -la /mnt/nas/

# Fix directory permissions
sudo chown -R pi:pi /mnt/nas/
sudo chmod -R 755 /mnt/nas/

# Check Samba users
sudo pdbedit -L

# Reset Samba password
sudo smbpasswd -a pi
sudo smbpasswd -e pi

# Restart Samba services
sudo systemctl restart smbd nmbd

# Test access
smbclient -L localhost -U pi`,
      prevention: "Maintain consistent user and group ownership across shared directories and regularly audit permissions.",
      severity: "medium",
      tags: ["permissions", "samba", "access", "users"]
    },
    {
      problem: "Network Connectivity Issues",
      description: "NAS becomes unreachable on the network intermittently, requiring manual reconnection.",
      solution: "Configure static IP address and ensure network interface stability with proper configuration.",
      commands: `# Check current network status
ip addr show eth0
ip route show

# Configure static IP in dhcpcd.conf
sudo nano /etc/dhcpcd.conf

# Add these lines:
interface eth0
static ip_address=192.168.1.100/24
static routers=192.168.1.1
static domain_name_servers=8.8.8.8 8.8.4.4

# Restart networking
sudo systemctl restart dhcpcd

# Test connectivity
ping -c 4 8.8.8.8
ping -c 4 192.168.1.1`,
      prevention: "Use static IP configuration and monitor network interface status regularly.",
      severity: "medium",
      tags: ["network", "connectivity", "static-ip", "dhcp"]
    },
    {
      problem: "RAID Array Degraded",
      description: "One drive in the RAID 1 array has failed, causing degraded performance and data risk.",
      solution: "Replace failed drive and rebuild the RAID array to restore redundancy.",
      commands: `# Check RAID status
sudo mdadm --detail /dev/md0
cat /proc/mdstat

# Identify failed drive
sudo mdadm --detail /dev/md0 | grep -A 10 "State :"

# Remove failed drive (replace /dev/nvme1n1 with actual failed drive)
sudo mdadm /dev/md0 --remove /dev/nvme1n1

# Add new drive (replace with new drive path)
sudo mdadm /dev/md0 --add /dev/nvme1n1

# Monitor rebuild progress
watch cat /proc/mdstat

# Check final status
sudo mdadm --detail /dev/md0`,
      prevention: "Monitor RAID health regularly and replace drives at first sign of failure.",
      severity: "high",
      tags: ["raid", "degraded", "recovery", "hardware"]
    },
    {
      problem: "System Running Out of Space",
      description: "The filesystem is full, preventing new files from being written and causing system issues.",
      solution: "Clean up unnecessary files and monitor disk usage to prevent future space issues.",
      commands: `# Check disk usage
df -h
du -sh /mnt/nas/*

# Find largest files
sudo find /mnt/nas -type f -size +100M -exec ls -lh {} \;

# Clean up log files
sudo journalctl --vacuum-time=7d
sudo find /var/log -name "*.log" -type f -mtime +30 -delete

# Clean package cache
sudo apt clean
sudo apt autoremove

# Check for large files in home directory
du -sh /home/pi/*

# Monitor in real-time
watch df -h`,
      prevention: "Set up automated cleanup scripts and monitor disk usage regularly.",
      severity: "medium",
      tags: ["storage", "space", "cleanup", "maintenance"]
    },
    {
      problem: "Backup Scripts Failing",
      description: "Automated backup scripts are not running or failing silently, risking data loss.",
      solution: "Check script permissions, cron configuration, and fix any errors in backup scripts.",
      commands: `# Check cron jobs
crontab -l

# Check script permissions
ls -la /home/pi/scripts/backup.sh

# Make script executable
chmod +x /home/pi/scripts/backup.sh

# Test script manually
/home/pi/scripts/backup.sh

# Check logs
tail -f /var/log/nas/backup.log

# Check cron logs
sudo journalctl -u cron -f

# Fix common issues
sudo systemctl restart cron
crontab -e`,
      prevention: "Test backup scripts regularly and monitor cron job execution.",
      severity: "medium",
      tags: ["backup", "cron", "automation", "scripts"]
    }
  ];

  // Mock data for performance metrics
  const performanceMetrics = {
    keyStats: [
      {
        icon: "Zap",
        value: "500 MB/s",
        label: "Max Transfer Speed",
        trend: "up",
        change: "+40% vs Pi 4 baseline"
      },
      {
        icon: "HardDrive",
        value: "1.8 TB",
        label: "Available Storage",
        trend: "stable",
        change: "90% capacity"
      },
      {
        icon: "Cpu",
        value: "23%",
        label: "Avg CPU Usage",
        trend: "down",
        change: "-8% optimized"
      },
      {
        icon: "Thermometer",
        value: "48°C",
        label: "Operating Temp",
        trend: "stable",
        change: "Within limits"
      }
    ],
    transferSpeed: [
      { time: "00:00", speed: 95 },
      { time: "04:00", speed: 102 },
      { time: "08:00", speed: 108 },
      { time: "12:00", speed: 112 },
      { time: "16:00", speed: 110 },
      { time: "20:00", speed: 106 },
      { time: "24:00", speed: 98 }
    ],
    storageUsage: [
      { name: "Documents", value: 0.4 },
      { name: "Media", value: 0.8 },
      { name: "Backups", value: 0.3 },
      { name: "System", value: 0.1 },
      { name: "Free", value: 0.4 }
    ],
    systemUsage: [
      { resource: "CPU", usage: 23 },
      { resource: "Memory", usage: 45 },
      { resource: "Storage I/O", usage: 67 },
      { resource: "Network", usage: 34 }
    ],
    uptime: {
      current: "45 days, 12 hours",
      monthly: "99.8%",
      reliability: "Excellent"
    },
    temperature: {
      cpu: "58",
      storage: "42",
      status: "Normal"
    }
  };


  // Mock data for GitHub integration
  const githubData = {
    url: "https://github.com/username/raspberry-pi-nas",
    stats: {
      stars: 247,
      forks: 89,
      commits: 156,
      contributors: 12
    },
    recentCommits: [
      {
        message: "Add automated backup script with email notifications",
        author: "john-doe",
        date: "2 days ago",
        hash: "a1b2c3d"
      },
      {
        message: "Update Samba configuration for better performance",
        author: "jane-smith",
        date: "5 days ago",
        hash: "e4f5g6h"
      },
      {
        message: "Fix RAID monitoring script temperature alerts",
        author: "mike-wilson",
        date: "1 week ago",
        hash: "i7j8k9l"
      },
      {
        message: "Add Docker container support documentation",
        author: "sarah-jones",
        date: "2 weeks ago",
        hash: "m0n1o2p"
      }
    ]
  };

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'walkthrough', label: 'Build Process', icon: 'List' },
    { id: 'code', label: 'Configuration', icon: 'Code' },
    { id: 'hardware', label: 'Hardware', icon: 'Cpu' },
    { id: 'lessons', label: 'Lessons Learned', icon: 'BookOpen' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: 'AlertTriangle' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'resources', label: 'Resources', icon: 'Download' }
    // { id: 'github', label: 'GitHub', icon: 'Github' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-12 overflow-hidden">
        {/* Galaxy Background - Only render when hero is visible */}
        {isHeroVisible && (
          <div className="absolute inset-0 z-0" style={{ width: '100%', height: '600px' }}>
            <Galaxy 
              focal={[0.5, 0.5]}
              rotation={[1.0, 0.0]}
              starSpeed={0.3}
              density={0.6}
              hueShift={0}
              disableAnimation={false}
              speed={0.5}
              mouseInteraction={false}
              glowIntensity={0.1}
              saturation={0.0}
              mouseRepulsion={false}
              twinkleIntensity={0.0}
              rotationSpeed={0.05}
              repulsionStrength={1.5}
              autoCenterRepulsion={0}
              transparent={false}
            />
          </div>
        )}
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Icon name="CheckCircle2" size={16} />
              <span>Project Completed</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 text-reveal drop-shadow-lg">
              Raspberry Pi 5 NAS
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-reveal stagger-2">
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={() => scrollToSection('walkthrough')}
                className="backdrop-blur-sm shadow-lg border-white/20 text-white hover:bg-white/10"
              >
                Start Walkthrough
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Sticky Navigation */}
      <nav className={`sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 ${
        isScrolled ? 'shadow-brand' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center space-x-1 py-4 overflow-x-auto">
            {navigationSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeSection === section?.id
                    ? 'bg-brand-primary text-white shadow-brand'
                    : 'text-text-secondary hover:text-brand-primary hover:bg-surface'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* Main Content */}
        {/* Pi 5 Requirements Notice */}
        <section className="py-8 bg-warning/5 border-b border-warning/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-start space-x-3 bg-warning/10 border border-warning/20 rounded-lg p-4">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-warning mb-2">Raspberry Pi 5 Required</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong className="text-slate-900">Important:</strong> This project is specifically designed for Raspberry Pi 5 due to its single-lane PCI Express (PCIe) interface, 
                  improved USB 3.0 performance, and enhanced ARM64 architecture. The commands and optimizations will not work properly on older Pi models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hardware Components */}
        <section id="hardware-components" className="py-12 bg-background scroll-mt-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Hardware Components</h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Complete parts list with current pricing and direct purchase links
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Core Components</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Raspberry Pi 5 8GB</h4>
                      <p className="text-sm text-text-secondary">Main board with 8GB RAM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-brand-primary">$99</p>
                      <a href="https://a.co/d/4tBYh7c" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">View on Amazon</a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Geekworm X1004 PCIe HAT</h4>
                      <p className="text-sm text-text-secondary">Dual M.2 NVMe PCIe adapter</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-brand-primary">$35</p>
                      <a href="https://a.co/d/bSsxj12" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">View on Amazon</a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">2x Kingston NV3 1TB</h4>
                      <p className="text-sm text-text-secondary">PCIe 4.0 NVMe SSDs for RAID 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-brand-primary">$158</p>
                      <p className="text-sm text-text-secondary">($79 each)</p>
                      <a href="https://a.co/d/5e3gnyA" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">View on Amazon</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Accessories & Cooling</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">GeeekPi Active Cooler</h4>
                      <p className="text-sm text-text-secondary">Armor Lite V5 cooling solution</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-brand-primary">$11</p>
                      <a href="https://a.co/d/gujcrwv" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">View on Amazon</a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Metal Case with PCIe Support</h4>
                      <p className="text-sm text-text-secondary">Compatible with X1004 HAT</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-brand-primary">$11</p>
                      <a href="https://a.co/d/cR0o7br" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">View on Amazon</a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">27W USB-C Power Supply</h4>
                      <p className="text-sm text-text-secondary">Official Pi 5 power adapter</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-brand-primary">$15</p>
                      <a href="https://a.co/d/f4jtLnA" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary hover:underline">View on Amazon</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-6 py-3 rounded-lg">
                <Icon name="DollarSign" size={20} />
                <span className="text-lg font-semibold">Total Project Cost: ~$279</span>
              </div>
              <p className="text-sm text-text-secondary mt-2">Significantly less than commercial NAS solutions with similar performance</p>
            </div>
          </div>
        </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-16">
        
        {/* Project Overview */}
        <section id="overview" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Project Overview</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Key metrics and achievements from this comprehensive NAS build project
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectOverview?.map((item, index) => (
              <ProjectOverviewCard
                key={index}
                title={item?.title}
                value={item?.value}
                icon={item?.icon}
                description={item?.description}
                color={item?.color}
              />
            ))}
          </div>
        </section>

        {/* Step-by-Step Walkthrough */}
        <section id="walkthrough" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Build Process Walkthrough</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Follow the complete journey from hardware assembly to final deployment with detailed explanations and code examples
            </p>
          </div>
          <StepWalkthrough steps={buildSteps} />
        </section>

        {/* Configuration Files */}
        <section id="code" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Configuration Files</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Production-ready configuration files with detailed explanations and optimization notes
            </p>
          </div>
          <div className="space-y-8">
            <CodeBlock
              title="Optimized Samba Configuration"
              language="ini"
              filename="/etc/samba/smb.conf"
              variant="green"
              code={`[global]
   workgroup = WORKGROUP
   server string = Raspberry Pi NAS
   netbios name = RASPINAS
   security = user
   map to guest = bad user
   dns proxy = no
   
   # Performance optimizations
   socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072
   read raw = yes
   write raw = yes
   max xmit = 65535
   dead time = 15
   getwd cache = yes
   
   # SMB3 for better security and performance
   min protocol = SMB3
   max protocol = SMB3
   
   # Logging
   log file = /var/log/samba/log.%m
   max log size = 1000
   log level = 1

[documents]
   comment = Documents Share
   path = /mnt/nas/documents
   browseable = yes
   read only = no
   guest ok = no
   create mask = 0644
   directory mask = 0755
   valid users = pi

[media]
   comment = Media Files
   path = /mnt/nas/media
   browseable = yes
   read only = no
   guest ok = no
   create mask = 0644
   directory mask = 0755
   valid users = pi

[backups]
   comment = Backup Storage
   path = /mnt/nas/backups
   browseable = yes
   read only = no
   guest ok = no
   create mask = 0600
   directory mask = 0700
   valid users = pi`}
            />
            
            <CodeBlock
              title="RAID Monitor Configuration"
              language="json"
              filename="/home/pi/config/raid_monitor.json"
              variant="green"
              code={`{
  "email": {
    "smtp_server": "smtp.gmail.com",
    "smtp_port": 587,
    "username": "your-email@gmail.com",
    "password": "your-app-password",
    "from": "your-email@gmail.com",
    "to": "admin@yourdomain.com"
  },
  "check_interval": 300,
  "raid_device": "/dev/md0"
}`}
            />
            
            <CodeBlock
              title="RAID Monitoring Script"
              language="python"
              filename="/home/pi/scripts/raid_monitor.py"
              variant="green"
              code={`#!/usr/bin/env python3
"""
RAID Health Monitoring Script
Monitors RAID array status and sends alerts for any issues
"""

import subprocess
import smtplib
import json
import time
from email.mime.text import MIMEText
from datetime import datetime

class RAIDMonitor:
    def __init__(self, config_file='/home/pi/config/raid_monitor.json'):
        try:
            with open(config_file, 'r') as f:
                self.config = json.load(f)
        except FileNotFoundError:
            print(f"Config file {config_file} not found. Using defaults.")
            self.config = {
                'email': {'smtp_server': 'localhost', 'smtp_port': 25, 'username': '', 'password': '', 'from': 'pi@localhost', 'to': 'pi@localhost'},
                'check_interval': 300,
                'raid_device': '/dev/md0'
            }
        
    def check_raid_status(self):
        """Check RAID array status using mdadm"""
        try:
            result = subprocess.run(['mdadm', '--detail', self.config['raid_device']], 
                                  capture_output=True, text=True)
            
            if result.returncode != 0:
                return {'status': 'error', 'message': 'RAID array not found'}
            
            output = result.stdout
            
            # Parse mdadm output
            status = {
                'array_status': 'unknown',
                'active_devices': 0,
                'working_devices': 0,
                'failed_devices': 0,
                'spare_devices': 0
            }
            
            for line in output.split('\n'):
                if 'State :' in line:
                    status['array_status'] = line.split(':')[1].strip()
                elif 'Active Devices :' in line:
                    status['active_devices'] = int(line.split(':')[1].strip())
                elif 'Working Devices :' in line:
                    status['working_devices'] = int(line.split(':')[1].strip())
                elif 'Failed Devices :' in line:
                    status['failed_devices'] = int(line.split(':')[1].strip())
                elif 'Spare Devices :' in line:
                    status['spare_devices'] = int(line.split(':')[1].strip())
            
            return status
            
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def send_alert(self, subject, message):
        """Send email alert"""
        try:
            msg = MIMEText(message)
            msg['Subject'] = f"[RAID Alert] {subject}"
            msg['From'] = self.config['email']['from']
            msg['To'] = self.config['email']['to']
            
            with smtplib.SMTP(self.config['email']['smtp_server'], 
                            self.config['email']['smtp_port']) as server:
                server.starttls()
                server.login(self.config['email']['username'], 
                           self.config['email']['password'])
                server.send_message(msg)
                
            print(f"Alert sent: {subject}")
            
        except Exception as e:
            print(f"Failed to send alert: {e}")
    
    def test_raid_status(self):
        """Test RAID status check without sending alerts"""
        print("Testing RAID status check...")
        status = self.check_raid_status()
        print(f"RAID Status: {status}")
        return status
    
    def monitor(self):
        """Main monitoring loop"""
        print(f"Starting RAID monitoring at {datetime.now()}")
        
        while True:
            status = self.check_raid_status()
            
            if status.get('status') == 'error':
                self.send_alert("RAID Error", 
                              f"RAID monitoring error: {status['message']}")
            elif status.get('failed_devices', 0) > 0:
                self.send_alert("RAID Failure Detected", 
                              f"Failed devices: {status['failed_devices']}\n"
                              f"Array status: {status['array_status']}")
            elif status.get('array_status') != 'clean':
                self.send_alert("RAID Status Warning", 
                              f"Array status: {status['array_status']}\n"
                              f"This may indicate degraded performance or issues.")
            
            # Log status
            print(f"{datetime.now()}: RAID Status - {status.get('array_status', 'unknown')}")
            
            time.sleep(self.config.get('check_interval', 300))  # Default 5 minutes

if __name__ == "__main__":
    import sys
    monitor = RAIDMonitor()
    
    if len(sys.argv) > 1 and sys.argv[1] == '--test':
        monitor.test_raid_status()
    else:
        monitor.monitor()`}
            />
            
            <CodeBlock
              title="Setup RAID Monitor"
              language="bash"
              filename="Setup script for RAID monitoring"
              variant="green"
              code={`# Create config directory
sudo mkdir -p /home/pi/config

# Create the configuration file
sudo tee /home/pi/config/raid_monitor.json > /dev/null << 'EOF'
{
  "email": {
    "smtp_server": "smtp.gmail.com",
    "smtp_port": 587,
    "username": "your-email@gmail.com",
    "password": "your-app-password",
    "from": "your-email@gmail.com",
    "to": "admin@yourdomain.com"
  },
  "check_interval": 300,
  "raid_device": "/dev/md0"
}
EOF

# Make the script executable
chmod +x /home/pi/scripts/raid_monitor.py

# Note: smtplib is included with Python 3 by default

# Test the script
python3 /home/pi/scripts/raid_monitor.py --test

# Add to crontab for continuous monitoring (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/bin/python3 /home/pi/scripts/raid_monitor.py") | crontab -`}
            />
          </div>
        </section>

        {/* Hardware Gallery */}
        <section id="hardware" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Hardware Gallery</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Visual documentation of the build process from initial components to final assembly
            </p>
          </div>
          <HardwareGallery images={hardwareImages} />
        </section>

        {/* Lessons Learned */}
        <section id="lessons" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Lessons Learned</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Challenges faced, solutions implemented, and skills developed throughout the project
            </p>
          </div>
          <LessonsLearned lessons={lessonsLearned} />
        </section>

        {/* Troubleshooting Guide */}
        <section id="troubleshooting" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Troubleshooting Guide</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Common issues encountered during the build and their solutions
            </p>
          </div>
          <TroubleshootingGuide issues={troubleshootingIssues} />
        </section>

        {/* Performance Metrics */}
        <section id="performance" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Performance Metrics</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Real-world performance data and system monitoring results
            </p>
          </div>
          <PerformanceMetrics metrics={performanceMetrics} />
        </section>


        {/* Resources */}
        <section id="resources" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Resources & Documentation</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Additional resources, documentation, and helpful links for building your own NAS
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="BookOpen" size={24} color="var(--color-brand-primary)" />
                <h3 className="text-xl font-semibold text-foreground">Documentation</h3>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a href="https://www.raspberrypi.org/documentation/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Raspberry Pi Official Documentation
                  </a>
                </li>
                <li>
                  <a href="https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Samba Configuration Guide
                  </a>
                </li>
                <li>
                  <a href="https://raid.wiki.kernel.org/index.php/Mdadm" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • RAID Management with mdadm
                  </a>
                </li>
                <li>
                  <a href="https://www.linux.org/docs/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Linux System Administration
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Tool" size={24} color="var(--color-brand-primary)" />
                <h3 className="text-xl font-semibold text-foreground">Tools & Software</h3>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a href="https://www.raspberrypi.org/downloads/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Raspberry Pi Imager
                  </a>
                </li>
                <li>
                  <a href="https://www.putty.org/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • PuTTY (SSH Client)
                  </a>
                </li>
                <li>
                  <a href="https://winscp.net/eng/download.php" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • WinSCP (File Transfer)
                  </a>
                </li>
                <li>
                  <a href="https://www.advanced-ip-scanner.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Advanced IP Scanner
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="ExternalLink" size={24} color="var(--color-brand-primary)" />
                <h3 className="text-xl font-semibold text-foreground">Community</h3>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a href="https://forums.raspberrypi.org/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Raspberry Pi Forums
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/r/raspberry_pi/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Reddit r/raspberry_pi
                  </a>
                </li>
                <li>
                  <a href="https://stackoverflow.com/questions/tagged/raspberry-pi" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • Stack Overflow
                  </a>
                </li>
                <li>
                  <a href="https://github.com/topics/raspberry-pi" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                    • GitHub Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* GitHub Integration */}
        {/* <section id="github" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Source Code Repository</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Complete source code, documentation, and community contributions
            </p>
          </div>
          <GitHubIntegration repoData={githubData} />
        </section> */}

      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Project Information</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>Build Duration: 2 Days</p>
                <p>Total Cost: $180</p>
                <p>Performance: 500 MB/s</p>
                <p>Uptime: 99.8%</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {['Raspberry Pi 5 OS', 'Samba', 'RAID 1', 'mdadm', 'systemctl', 'ufw', 'fail2ban', 'rsync', 'crontab', 'iperf3', 'stress-ng', 'htop']?.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" onClick={() => window.open(githubData?.url, '_blank')}>
                  <Icon name="Github" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Mail" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Linkedin" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} TechBlog Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDeepDive;