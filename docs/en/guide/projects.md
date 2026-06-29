# Project Management

Project management isolates test data for different targets, making it easy to organize and manage security testing work.

## Overview

- **Project Isolation**: Each project has independent Flows, Findings, settings
- **Quick Switching**: Switch contexts between projects quickly
- **Project Settings**: Configure scan rules, AI parameters per project

## Create Project

### New Project

1. Click project dropdown in title bar
2. Select **New Project**
3. Enter project name and description
4. Click **Create**

### Project Information

| Field | Description |
|-------|-------------|
| Name | Project display name |
| Description | Project description (optional) |
| Created | Auto-recorded creation time |
| Last Opened | Last time project was opened |

## Switch Project

### Switch

1. Click project dropdown in title bar
2. Select project from list
3. Project context switches automatically

### Switch Impact

When switching projects, these items switch:

- Forwarder Flow list
- Scanner Finding list
- Project configuration (scan rules, AI settings)

## Project Settings

Go to **Settings** → **Project Settings**:

### Scan Rule Configuration

Select scan rules enabled for current project:

- [x] Sensitive Info Leak
- [x] Cookie Security
- [ ] Transport Security
- [x] CORS Configuration
- ...

### AI Configuration

Configure AI parameters per project:

| Option | Description |
|--------|-------------|
| Default Provider | AI Provider for project |
| Context Budget | AI analysis context size |
| Auto Memory | Whether to auto-record to memory |

## Data Isolation

### Flow Isolation

- New captured Flows bind to current project
- Forwarder list shows only current project's Flows
- Flow list refreshes when switching projects

### Finding Isolation

- Scan Findings bind to current project
- Finding list filtered by project
- Cascade delete when deleting project

### Settings Isolation

- Scan rule config saved per project
- AI config saved per project
- Other settings shared globally

## Project Operations

### Edit Project

1. Go to **Settings** → **Project Settings**
2. Modify name or description
3. Click **Save**

### Delete Project

1. Go to **Settings** → **Project Settings**
2. Click **Delete Project**
3. Confirm deletion

::: warning Dangerous Operation
Deleting project cascades:
- All associated Flow data
- All associated Finding data
- Project configuration

This operation is irreversible!
:::

### Export Project

Support exporting project data:

- Flow data (JSON format)
- Finding data (JSON format)
- Project configuration

## Use Cases

### Multi-Target Testing

```
Scenario: Test multiple targets simultaneously

1. Create Project A for Target A
2. Create Project B for Target B
3. Switch to Project A, configure proxy, start testing
4. Switch to Project B, continue testing
5. Data completely isolated, no interference
```

### Team Collaboration

```
Scenario: Multiple people testing same target

1. Create shared project
2. Each exports test results
3. Merge results into unified report
```

## Best Practices

1. **Create projects per target**
   - One project per independent target
   - Avoid data confusion

2. **Naming conventions**
   - Use clear project names
   - Include target info or dates

3. **Regular cleanup**
   - Delete unneeded projects
   - Free storage space

4. **Backup important data**
   - Export important project reports
   - Retain test evidence
