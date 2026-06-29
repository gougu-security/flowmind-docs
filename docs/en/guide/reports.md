# Reports

FlowMind supports exporting test results as structured reports for recording, sharing, and archiving.

## Report Formats

| Format | Description | Use Case |
|--------|-------------|----------|
| JSON | Structured export | Archiving and manual review (export in app) |
| PDF | Printable document format | Formal reports, archiving |

## Export Report

### Export Steps

1. Ensure current project has test data
2. Go to **Reports** page
3. Select export format
4. Configure report options
5. Click **Export**

### Report Options

| Option | Description |
|--------|-------------|
| Include Flows | Whether to include traffic data |
| Include Findings | Whether to include security findings |
| Include Clips | Whether to include content clips |
| Time Range | Export data for specified period |

## JSON Report

Exports include project metadata, summary statistics, and optional flows, findings, and clips. Field layout follows the current app version; **full JSON Schema is not published**. Contact support for enterprise integration.

### Use Cases

- Team archiving and backup
- Manual review in internal workflows

## PDF Report

### Report Content

PDF report includes:

1. **Cover**: Project name, date, version
2. **Summary**: Test overview, statistics
3. **Findings**: Findings sorted by severity
4. **Traffic Stats**: Request methods, status distribution
5. **Appendix**: Detailed data tables

## Content Clips

### What are Clips

Content clips collect important information during testing:

- Interesting requests/responses
- Key technical details
- Testing notes
- Screenshots and annotations

### Add Clips

1. Select request in Forwarder
2. Right-click → **Add to Clips**
3. Add notes

### Manage Clips

Go to **Reports** → **Clip Management**:

- View all clips
- Edit notes
- Delete clips
- Export clips

## Notes

### Purpose

Notes record thoughts, discoveries, and plans during testing:

- Testing ideas
- Hypotheses to verify
- Important findings
- Follow-up plans

### Use Notes

1. Go to **Reports** → **Notes**
2. Click **New Note**
3. Enter title and content
4. Save

## Exported Reports

### View History

Go to **Reports** → **Exported**:

- View export history
- Re-download reports
- Delete old reports

### Report Management

| Action | Description |
|--------|-------------|
| Download | Re-download report file |
| Delete | Delete report record |
| View Details | View export configuration |

## Best Practices

### Report Content

1. **Include key findings**: Ensure important Findings in report
2. **Add context**: Use clips and notes for explanation
3. **Export regularly**: Avoid data loss

### Report Format

1. **Formal occasions**: Use PDF format
2. **Technical exchange**: Use JSON format
3. **Internal records**: Export both formats

### Report Quality

1. **Check data completeness**: Confirm all data included
2. **Verify format**: Preview report content
3. **Protect sensitive info**: Note sensitive data in reports
