import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Galaxy from '../../../components/ui/Galaxy';

const RaspberryPiTutorial = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = React.useRef(null);

  // Intersection Observer for hero visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { rootMargin: '-200px' }
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

  const learningPath = [
    {
      phase: 1,
      title: "Raspberry Pi Setup & Basics",
      duration: "4 weeks",
      difficulty: "Beginner",
      description: "Learn to set up your Raspberry Pi and understand basic GPIO programming",
      topics: [
        "Hardware Setup and Configuration",
        "Raspberry Pi OS Installation",
        "GPIO Pin Configuration",
        "Basic Python Programming"
      ],
      resources: [
        {
          title: "Raspberry Pi Official Guide",
          url: "https://github.com/mikeroyal/Raspberry-Pi-Guide",
          type: "Documentation",
          description: "Comprehensive Raspberry Pi setup and configuration guide"
        }
      ],
      projects: [
        {
          title: "LED Blink Project",
          description: "Create your first GPIO project with LED blinking",
          code: `# LED Blink Project
import RPi.GPIO as GPIO
import time

# Set up GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Define LED pin
LED_PIN = 18
GPIO.setup(LED_PIN, GPIO.OUT)

def blink_led(duration=1, times=5):
    """Blink LED for specified duration and times"""
    for i in range(times):
        GPIO.output(LED_PIN, GPIO.HIGH)
        print(f"LED ON - Blink {i+1}")
        time.sleep(duration)
        
        GPIO.output(LED_PIN, GPIO.LOW)
        print(f"LED OFF - Blink {i+1}")
        time.sleep(duration)

def cleanup():
    """Clean up GPIO pins"""
    GPIO.cleanup()
    print("GPIO cleanup complete")

if __name__ == "__main__":
    try:
        print("Starting LED Blink Project")
        blink_led(0.5, 10)  # Blink for 0.5 seconds, 10 times
    except KeyboardInterrupt:
        print("\\nProject stopped by user")
    finally:
        cleanup()`
        },
        {
          title: "Button Input Project",
          description: "Add button input to control LED",
          code: `# Button and LED Project
import RPi.GPIO as GPIO
import time

# Set up GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Define pins
LED_PIN = 18
BUTTON_PIN = 24

# Setup pins
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# Initial state
led_state = False

def button_callback(channel):
    """Callback function for button press"""
    global led_state
    led_state = not led_state
    GPIO.output(LED_PIN, led_state)
    print(f"Button pressed! LED is now {'ON' if led_state else 'OFF'}")

# Add event detection for button press
GPIO.add_event_detect(BUTTON_PIN, GPIO.RISING, callback=button_callback, bouncetime=300)

def cleanup():
    """Clean up GPIO pins"""
    GPIO.cleanup()
    print("GPIO cleanup complete")

if __name__ == "__main__":
    try:
        print("Button and LED Project Started")
        print("Press the button to toggle LED")
        print("Press Ctrl+C to exit")
        
        while True:
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\\nProject stopped by user")
    finally:
        cleanup()`
        }
      ]
    },
    {
      phase: 2,
      title: "Advanced GPIO & Sensors",
      duration: "8 weeks",
      difficulty: "Intermediate",
      description: "Work with various sensors and create more complex projects",
      topics: [
        "Temperature and Humidity Sensors",
        "Motion Detection",
        "Motor Control",
        "Serial Communication"
      ],
      resources: [
        {
          title: "Raspberry Pi YouTube Projects",
          url: "https://www.youtube.com/watch?v=udOidMbTdWk",
          type: "Video Tutorials",
          description: "Hands-on Raspberry Pi project tutorials"
        }
      ],
      projects: [
        {
          title: "Temperature Monitoring System",
          description: "Build a temperature and humidity monitoring system",
          code: `# Temperature and Humidity Monitoring
import RPi.GPIO as GPIO
import Adafruit_DHT
import time
import json
from datetime import datetime

# Sensor configuration
DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4

# LED pins for status indication
GREEN_LED = 18
RED_LED = 23
GPIO.setmode(GPIO.BCM)
GPIO.setup(GREEN_LED, GPIO.OUT)
GPIO.setup(RED_LED, GPIO.OUT)

class TemperatureMonitor:
    def __init__(self):
        self.temperature = None
        self.humidity = None
        self.data_log = []
    
    def read_sensor(self):
        """Read temperature and humidity from DHT22 sensor"""
        humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
        
        if humidity is not None and temperature is not None:
            self.temperature = temperature
            self.humidity = humidity
            self.update_status_leds(True)
            return True
        else:
            self.update_status_leds(False)
            return False
    
    def update_status_leds(self, success):
        """Update status LEDs based on sensor reading success"""
        if success:
            GPIO.output(GREEN_LED, GPIO.HIGH)
            GPIO.output(RED_LED, GPIO.LOW)
        else:
            GPIO.output(GREEN_LED, GPIO.LOW)
            GPIO.output(RED_LED, GPIO.HIGH)
    
    def log_data(self):
        """Log sensor data with timestamp"""
        if self.temperature is not None and self.humidity is not None:
            data_point = {
                'timestamp': datetime.now().isoformat(),
                'temperature': round(self.temperature, 2),
                'humidity': round(self.humidity, 2)
            }
            self.data_log.append(data_point)
            
            # Keep only last 100 readings
            if len(self.data_log) > 100:
                self.data_log = self.data_log[-100:]
    
    def display_reading(self):
        """Display current sensor reading"""
        if self.temperature is not None and self.humidity is not None:
            print(f"Temperature: {self.temperature:.1f}°C")
            print(f"Humidity: {self.humidity:.1f}%")
            print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print("-" * 30)
        else:
            print("Failed to read sensor data")
    
    def save_log_to_file(self, filename="temperature_log.json"):
        """Save data log to JSON file"""
        try:
            with open(filename, 'w') as f:
                json.dump(self.data_log, f, indent=2)
            print(f"Data saved to {filename}")
        except Exception as e:
            print(f"Error saving data: {e}")

def cleanup():
    """Clean up GPIO pins"""
    GPIO.cleanup()
    print("GPIO cleanup complete")

if __name__ == "__main__":
    monitor = TemperatureMonitor()
    
    try:
        print("Temperature Monitoring System Started")
        print("Press Ctrl+C to exit")
        
        while True:
            if monitor.read_sensor():
                monitor.display_reading()
                monitor.log_data()
            else:
                print("Sensor reading failed, retrying...")
            
            time.sleep(5)  # Read every 5 seconds
            
    except KeyboardInterrupt:
        print("\\nMonitoring stopped by user")
        monitor.save_log_to_file()
    finally:
        cleanup()`
        }
      ]
    },
    {
      phase: 3,
      title: "Server Setup & NAS Project",
      duration: "12 weeks",
      difficulty: "Advanced",
      description: "Transform your Raspberry Pi into a NAS server with file sharing and automation",
      topics: [
        "Samba File Sharing Setup",
        "RAID Configuration",
        "Docker Containerization",
        "System Monitoring"
      ],
      resources: [
        {
          title: "Raspberry Pi NAS Guide",
          url: "https://blog.devops.dev/deploying-apps-to-your-raspberry-pi-using-git-docker-a481d32bcba3",
          type: "Tutorial",
          description: "Complete guide to setting up Raspberry Pi as NAS server"
        }
      ],
      projects: [
        {
          title: "Complete NAS Server Setup",
          description: "Build a full-featured NAS server with file sharing and monitoring",
          code: `# NAS Server Setup Script
#!/bin/bash

# Raspberry Pi NAS Server Setup Script
# This script sets up a complete NAS server with Samba, Docker, and monitoring

set -e

echo "Starting Raspberry Pi NAS Server Setup..."

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "Installing required packages..."
sudo apt install -y samba samba-common-bin docker.io docker-compose htop iotop nethogs

# Create NAS directories
echo "Creating NAS directory structure..."
sudo mkdir -p /nas/{public,private,backup,media}
sudo chmod 755 /nas/public
sudo chmod 700 /nas/private

# Configure Samba
echo "Configuring Samba file sharing..."
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup

# Add Samba configuration
sudo tee -a /etc/samba/smb.conf > /dev/null <<EOF

# NAS Configuration
[public]
   comment = Public Files
   path = /nas/public
   browseable = yes
   read only = no
   guest ok = yes
   create mask = 0777
   directory mask = 0777

[private]
   comment = Private Files
   path = /nas/private
   browseable = yes
   read only = no
   guest ok = no
   valid users = pi
   create mask = 0700
   directory mask = 0700

[backup]
   comment = Backup Storage
   path = /nas/backup
   browseable = yes
   read only = no
   guest ok = no
   valid users = pi
   create mask = 0600
   directory mask = 0700
EOF

# Set Samba password for pi user
echo "Setting up Samba user..."
sudo smbpasswd -a pi

# Start and enable Samba
sudo systemctl enable smbd
sudo systemctl start smbd

# Configure Docker
echo "Setting up Docker..."
sudo usermod -aG docker pi
sudo systemctl enable docker
sudo systemctl start docker

# Create Docker Compose for monitoring
echo "Setting up monitoring with Docker..."
cat > /home/pi/docker-compose.yml << 'EOF'
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'

volumes:
  prometheus_data:
  grafana_data:
EOF

# Create Prometheus configuration
cat > /home/pi/prometheus.yml << 'EOF'
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
EOF

# Create system monitoring script
cat > /home/pi/monitor_system.sh << 'EOF'
#!/bin/bash

# System monitoring script
LOG_FILE="/nas/backup/system_monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Get system information
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')
DISK_USAGE=$(df -h / | awk 'NR==2{printf "%s", $5}' | cut -d'%' -f1)
TEMP=$(vcgencmd measure_temp | cut -d'=' -f2)

# Log to file
echo "$DATE,CPU:$CPU_USAGE%,Memory:$MEMORY_USAGE%,Disk:$DISK_USAGE%,Temp:$TEMP" >> $LOG_FILE

# Check if disk usage is high
if [ $DISK_USAGE -gt 80 ]; then
    echo "WARNING: Disk usage is above 80%"
fi

# Check if temperature is high
TEMP_NUM=$(echo $TEMP | cut -d"'" -f1)
if (( $(echo "$TEMP_NUM > 70" | bc -l) )); then
    echo "WARNING: CPU temperature is above 70°C"
fi
EOF

chmod +x /home/pi/monitor_system.sh

# Add monitoring to crontab
echo "Setting up automated monitoring..."
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/pi/monitor_system.sh") | crontab -

# Start monitoring services
echo "Starting monitoring services..."
cd /home/pi
docker-compose up -d

echo "NAS Server Setup Complete!"
echo "=========================="
echo "Samba shares available at:"
echo "  - \\\\$(hostname -I | awk '{print $1}')\\public"
echo "  - \\\\$(hostname -I | awk '{print $1}')\\private"
echo "  - \\\\$(hostname -I | awk '{print $1}')\\backup"
echo ""
echo "Monitoring dashboards:"
echo "  - Prometheus: http://$(hostname -I | awk '{print $1}'):9090"
echo "  - Grafana: http://$(hostname -I | awk '{print $1}'):3000 (admin/admin)"
echo ""
echo "System monitoring logs: /nas/backup/system_monitor.log"
echo "Setup complete! Reboot recommended."`
        }
      ]
    }
  ];

  const togglePhaseCompletion = (phase) => {
    if (completedPhases.includes(phase)) {
      setCompletedPhases(completedPhases.filter(p => p !== phase));
    } else {
      setCompletedPhases([...completedPhases, phase]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Galaxy Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-12 overflow-hidden">
        {/* Galaxy Background */}
        {isHeroVisible && (
          <div className="absolute inset-0 z-0" style={{ width: '100%', height: '600px' }}>
            <Galaxy 
              focal={[0.5, 0.5]}
              rotation={[1.0, 0.0]}
              starSpeed={0.1}
              density={0.4}
              hueShift={0}
              disableAnimation={false}
              speed={0.2}
              mouseInteraction={false}
              glowIntensity={0.05}
              saturation={0.0}
              mouseRepulsion={false}
              twinkleIntensity={0.0}
              rotationSpeed={0.02}
              repulsionStrength={1.0}
              autoCenterRepulsion={0}
              transparent={false}
            />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6"></div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 text-reveal drop-shadow-lg">
              Raspberry Pi Complete Guide
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Master Raspberry Pi from basic GPIO programming to building a complete NAS server with monitoring and automation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span>24 weeks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span>Advanced</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Code" size={20} />
                <span>3 Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">Learning Path</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Follow this comprehensive 24-week journey to master Raspberry Pi development and build real-world projects.
              </p>
            </motion.div>

            {learningPath.map((phase, index) => (
              <motion.div
                key={phase.phase}
                variants={itemVariants}
                className="bg-card rounded-2xl border border-border p-8 shadow-brand hover:shadow-brand-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      completedPhases.includes(phase.phase) 
                        ? 'bg-conversion-accent text-white' 
                        : 'bg-brand-primary text-white'
                    }`}>
                      <Icon 
                        name={completedPhases.includes(phase.phase) ? "Check" : "Cpu"} 
                        size={24} 
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary">{phase.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span>{phase.duration}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-lg ${
                          phase.difficulty === 'Beginner' ? 'bg-conversion-accent/10 text-conversion-accent' :
                          phase.difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {phase.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={completedPhases.includes(phase.phase) ? "outline" : "default"}
                    size="sm"
                    onClick={() => togglePhaseCompletion(phase.phase)}
                    iconName={completedPhases.includes(phase.phase) ? "Check" : "Play"}
                    iconPosition="left"
                  >
                    {completedPhases.includes(phase.phase) ? 'Completed' : 'Start'}
                  </Button>
                </div>

                <p className="text-text-secondary mb-6">{phase.description}</p>

                {/* Topics */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">What You'll Learn:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-conversion-accent" />
                        <span className="text-text-primary">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">Resources:</h4>
                  <div className="space-y-2">
                    {phase.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                        <div>
                          <h5 className="font-medium text-text-primary">{resource.title}</h5>
                          <p className="text-sm text-text-secondary">{resource.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(resource.url, '_blank')}
                          iconName="ExternalLink"
                          iconPosition="right"
                        >
                          Visit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {phase.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="bg-surface rounded-lg p-6">
                    <h4 className="font-semibold text-text-primary mb-3">{project.title}</h4>
                    <p className="text-text-secondary mb-4">{project.description}</p>
                    <details className="group">
                      <summary className="cursor-pointer text-brand-primary hover:text-brand-secondary font-medium">
                        View Code Example
                      </summary>
                      <pre className="mt-4 p-4 bg-background rounded-lg overflow-x-auto text-sm">
                        <code>{project.code}</code>
                      </pre>
                    </details>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Project */}
      <section className="py-16 bg-surface" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Final Project</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Build a complete NAS server with file sharing, monitoring, and automation using your Raspberry Pi.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-8 shadow-brand">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Raspberry Pi NAS Server</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Features to Implement:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Samba file sharing with user authentication</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Docker containerization for services</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>System monitoring with Prometheus & Grafana</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-conversion-accent" />
                    <span>Automated backup and logging</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Raspberry Pi OS', 'Python', 'Samba', 'Docker', 'Prometheus', 'Grafana', 'Bash Scripting'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16" data-light-section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => window.history.back()}
            >
              Back to Tutorials
            </Button>
            <Button
              variant="default"
              size="lg"
              iconName="Github"
              iconPosition="left"
              onClick={() => window.open('https://github.com/Hampterz/raspberry-pi-nas', '_blank')}
            >
              View Source Code
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RaspberryPiTutorial;
