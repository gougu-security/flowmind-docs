# License & Activation

Some FlowMind features require a valid license. Manage everything under **Settings → License** in the app—no manual editing of system files is required.

::: warning Security
- License files (`.license`) and request files (`.license-request`) are for you and authorized administrators only. **Do not share them publicly or commit them to repositories.**
- If a license is device-bound, do not use the same file on unauthorized machines.
- For support, contact your administrator. **Do not** paste full license contents or device identifiers in public channels.
:::

## Current status

The status card at the top of **Settings → License** shows:

| Status | Meaning |
|--------|---------|
| Unlicensed | No valid license imported |
| Valid | License active; features per entitlement |
| Expired | Past validity period |
| Device mismatch | License binding does not match this device |
| Revoked | License has been revoked |

The card may also show plan (trial, professional, etc.), days remaining, and entitled features as displayed in the app.

Use **Refresh status** to reload local license information.

## Import a license

When you receive a license file from an administrator:

1. Open **Settings → License**
2. Under **Import license file**, click **Select and import license file**
3. Choose a `.license` file
4. Confirm the result shown in the app

If import fails (invalid or device mismatch), contact the issuer for a new file.

## Request a new license

If you do not have a license file yet:

1. Under **Generate license request**, fill in **Customer name** and **Customer email**
2. Optionally add a note (e.g. trial, internal test)
3. Click **Generate license request**
4. Send the generated `.license-request` file to your administrator or support channel

::: tip
The request file contains device-related information for issuance only. Send it through a **private channel** agreed with your administrator—not public forums or group chats.
:::

After receiving a `.license` file, import it as described above.

## Remove license

To deactivate the license on this machine:

1. Click **Remove license** on the status card
2. Confirm; features revert to unlicensed/limited state

Removal affects this device only. Re-activation requires importing a valid license again.

## FAQ

### Still unlicensed or invalid after import

- Ensure the file is intact and not renamed or corrupted
- Click **Refresh status** and retry
- If it still fails, contact the issuer with your **request file or ticket ID**—do not post the full license publicly

### Device mismatch

The license binding does not match this device. Contact the administrator for re-issuance or confirm universal license policy.

### Feature locked or upgrade prompt

Your license does not include that feature. Check the feature list on the status card or contact the administrator.

### License expired

Contact the administrator to renew or re-issue. Advanced features may be restricted after expiry.

## Getting help

- Commercial users: contact your administrator or support channel
- Trial users: generate a license request in the app and submit as instructed

::: info Note
This page covers **in-app usage only**. Issuance, policy configuration, and internal implementation are not published in public documentation; maintainer docs are restricted to authorized personnel.
:::
