import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const COLORS = ['#1E3A8A', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics?.keyStats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center">
                <Icon name={stat?.icon} size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={stat?.trend === 'up' ? 'TrendingUp' : stat?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                color={stat?.trend === 'up' ? 'var(--color-success)' : stat?.trend === 'down' ? 'var(--color-destructive)' : 'var(--color-muted-foreground)'} 
              />
              <span className={`text-sm ${
                stat?.trend === 'up' ? 'text-success' : 
                stat?.trend === 'down'? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {stat?.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transfer Speed Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Activity" size={20} color="var(--color-brand-primary)" />
            <span>Transfer Speed Over Time</span>
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics?.transferSpeed}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  tickFormatter={(value) => `${value} MB/s`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value} MB/s`, 'Speed']}
                />
                <Line 
                  type="monotone" 
                  dataKey="speed" 
                  stroke="var(--color-brand-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-brand-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Storage Usage Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="HardDrive" size={20} color="var(--color-brand-primary)" />
            <span>Storage Usage Distribution</span>
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics?.storageUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metrics?.storageUsage?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [formatBytes(value * 1024 * 1024 * 1024), 'Size']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* System Resource Usage */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Cpu" size={20} color="var(--color-brand-primary)" />
          <span>System Resource Usage</span>
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics?.systemUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="resource" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Usage']}
              />
              <Bar 
                dataKey="usage" 
                fill="var(--color-brand-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Uptime and Reliability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Clock" size={20} color="var(--color-success)" />
            <span>Uptime Statistics</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Current Uptime</span>
              <span className="font-semibold text-foreground">{metrics?.uptime?.current}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Average Monthly</span>
              <span className="font-semibold text-foreground">{metrics?.uptime?.monthly}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Reliability Score</span>
              <span className="font-semibold text-success">{metrics?.uptime?.reliability}</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Thermometer" size={20} color="var(--color-warning)" />
            <span>Temperature Monitoring</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">CPU Temperature</span>
              <span className="font-semibold text-foreground">{metrics?.temperature?.cpu}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Storage Temperature</span>
              <span className="font-semibold text-foreground">{metrics?.temperature?.storage}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Status</span>
              <span className="font-semibold text-success">{metrics?.temperature?.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;