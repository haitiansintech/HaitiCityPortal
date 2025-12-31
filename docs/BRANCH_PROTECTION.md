# Branch Protection Configuration

This document provides the exact commands and settings to configure advanced branch protection for the Haiti City Portal repository.

## Prerequisites

1. Install GitHub CLI: `gh auth login`
2. Ensure you have admin access to the repository

---

## Configuration Commands

### 1. Enable Branch Protection for `main`

```bash
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  /repos/haitiansintech/HaitiCityPortal/branches/main/protection \
  -f required_status_checks='{"strict":true,"contexts":["License Header Check"]}' \
  -f enforce_admins=true \
  -f required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}' \
  -f restrictions=null \
  -f required_signatures=true
```

### 2. Require Signed Commits

```bash
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/haitiansintech/HaitiCityPortal/branches/main/protection/required_signatures
```

### 3. Dismiss Stale Reviews on New Commits

This is included in the main protection command above via:
```json
"dismiss_stale_reviews": true
```

---

## Settings Breakdown

### Required Status Checks
- **Strict**: `true` - Branches must be up to date before merging
- **Contexts**: `["License Header Check"]` - Must pass license check workflow

### Pull Request Reviews
- **Dismiss Stale Reviews**: `true` - Invalidates approvals when new commits are pushed
- **Require Code Owner Reviews**: `true` - At least one CODEOWNERS approval required
- **Required Approving Review Count**: `1` - Minimum one approval

### Signed Commits
- **Required Signatures**: `true` - All commits must be GPG/SSH signed

### Enforce for Admins
- **Enforce Admins**: `true` - Rules apply to repository administrators

---

## Alternative: GitHub Web UI

If you prefer to configure via the web interface:

1. Go to: `https://github.com/haitiansintech/HaitiCityPortal/settings/branches`
2. Click **Add rule** for `main` branch
3. Enable:
   - ✅ Require a pull request before merging
     - ✅ Require approvals (1)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require review from Code Owners
   - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - Add: `License Header Check`
   - ✅ Require signed commits
   - ✅ Include administrators

---

## Verification

After applying settings, verify with:

```bash
gh api \
  -H "Accept: application/vnd.github+json" \
  /repos/haitiansintech/HaitiCityPortal/branches/main/protection
```

Expected output should include:
```json
{
  "required_signatures": {
    "enabled": true
  },
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1
  }
}
```

---

## Setting Up GPG Signing (For Contributors)

Contributors must sign their commits. Here's how:

### 1. Generate GPG Key
```bash
gpg --full-generate-key
# Choose: RSA and RSA, 4096 bits, no expiration
```

### 2. Get Your Key ID
```bash
gpg --list-secret-keys --keyid-format=long
# Copy the key ID (after sec rsa4096/)
```

### 3. Export Public Key
```bash
gpg --armor --export YOUR_KEY_ID
```

### 4. Add to GitHub
1. Go to: `https://github.com/settings/keys`
2. Click **New GPG key**
3. Paste your public key

### 5. Configure Git
```bash
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
```

### 6. Test
```bash
git commit -S -m "Test signed commit"
git log --show-signature
```

---

## Why These Settings?

### Dismiss Stale Reviews
**Prevents "sneak-in" code**: If a PR is approved, then new commits are added, the approval is invalidated. This prevents malicious code from being added after review.

### Signed Commits
**Cryptographic verification**: Every commit is cryptographically tied to a verified GitHub user. This prevents:
- Impersonation attacks
- Unauthorized code injection
- Disputed authorship

### Required Status Checks
**Automated enforcement**: The license check workflow must pass, ensuring all code includes proper BSL 1.1 headers.

---

## Troubleshooting

### Error: "Resource not accessible by integration"
- Ensure you have admin access to the repository
- Re-authenticate: `gh auth login`

### Error: "Validation Failed"
- Check that the workflow name matches exactly: `License Header Check`
- Ensure the workflow file exists in `.github/workflows/`

### Commits Not Showing as Verified
- Ensure GPG key is added to GitHub
- Check git config: `git config --global commit.gpgsign`
- Verify key: `gpg --list-secret-keys`

---

**Last Updated**: December 31, 2024
