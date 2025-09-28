import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GitHubIntegration = ({ repoData }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <Icon name="Github" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">GitHub Repository</h3>
            <p className="text-sm text-muted-foreground">Complete source code and documentation</p>
          </div>
        </div>
        <Button
          variant="outline"
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={16}
          onClick={() => window.open(repoData?.url, '_blank')}
          className="border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white"
        >
          View Repository
        </Button>
      </div>
      {/* Repository Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-surface rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Star" size={16} color="var(--color-warning)" />
          </div>
          <div className="text-lg font-semibold text-foreground">{repoData?.stats?.stars}</div>
          <div className="text-xs text-muted-foreground">Stars</div>
        </div>
        <div className="text-center p-3 bg-surface rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="GitFork" size={16} color="var(--color-brand-primary)" />
          </div>
          <div className="text-lg font-semibold text-foreground">{repoData?.stats?.forks}</div>
          <div className="text-xs text-muted-foreground">Forks</div>
        </div>
        <div className="text-center p-3 bg-surface rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="GitCommit" size={16} color="var(--color-success)" />
          </div>
          <div className="text-lg font-semibold text-foreground">{repoData?.stats?.commits}</div>
          <div className="text-xs text-muted-foreground">Commits</div>
        </div>
        <div className="text-center p-3 bg-surface rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Users" size={16} color="var(--color-brand-secondary)" />
          </div>
          <div className="text-lg font-semibold text-foreground">{repoData?.stats?.contributors}</div>
          <div className="text-xs text-muted-foreground">Contributors</div>
        </div>
      </div>
      {/* Recent Commits */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="GitCommit" size={16} color="var(--color-brand-primary)" />
          <span>Recent Commits</span>
        </h4>
        <div className="space-y-3">
          {repoData?.recentCommits?.map((commit, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-lg hover:bg-surface/80 transition-colors duration-200">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="GitCommit" size={14} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{commit?.message}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                  <span>{commit?.author}</span>
                  <span>{commit?.date}</span>
                  <span className="font-mono">{commit?.hash}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                iconSize={14}
                onClick={() => window.open(`${repoData?.url}/commit/${commit?.hash}`, '_blank')}
                className="text-muted-foreground hover:text-foreground"
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Repository Structure */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="FolderTree" size={16} color="var(--color-brand-primary)" />
          <span>Repository Structure</span>
        </h4>
        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-slate-100 font-mono whitespace-pre">
{`raspberry-pi-nas/
├── config/
│   ├── samba.conf
│   ├── fstab
│   └── systemd/
├── scripts/
│   ├── setup.sh
│   ├── backup.sh
│   └── monitoring.py
├── docs/
│   ├── installation.md
│   ├── troubleshooting.md
│   └── performance.md
├── hardware/
│   ├── parts-list.md
│   └── assembly-guide.md
└── README.md`}
          </pre>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          onClick={() => window.open(`${repoData?.url}/archive/main.zip`, '_blank')}
          className="bg-success hover:bg-success/90"
        >
          Download ZIP
        </Button>
        <Button
          variant="outline"
          iconName="GitFork"
          iconPosition="left"
          iconSize={16}
          onClick={() => window.open(`${repoData?.url}/fork`, '_blank')}
        >
          Fork Repository
        </Button>
        <Button
          variant="outline"
          iconName="Eye"
          iconPosition="left"
          iconSize={16}
          onClick={() => window.open(`${repoData?.url}/subscription`, '_blank')}
        >
          Watch
        </Button>
        <Button
          variant="outline"
          iconName="Bug"
          iconPosition="left"
          iconSize={16}
          onClick={() => window.open(`${repoData?.url}/issues`, '_blank')}
        >
          Report Issue
        </Button>
      </div>
    </div>
  );
};

export default GitHubIntegration;