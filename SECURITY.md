# 🔒 Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v4.x    | :white_check_mark: |
| v3.x    | :x:                |
| v2.x    | :x:                |
| v1.x    | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@elabins.com. All security vulnerabilities will be promptly addressed.

## Security Measures

1. **Credential Management**

   - Using PropertiesService for secure storage
   - No hardcoded credentials
   - Regular credential rotation

2. **API Security**

   - Rate limiting implemented
   - API key validation
   - Secure endpoints

3. **Data Protection**

   - Minimal data collection
   - Secure data transmission
   - Regular security audits

4. **Access Control**
   - Role-based permissions
   - Audit logging
   - Access monitoring

## Best Practices

1. Keep your Google Apps Script project updated
2. Regularly rotate API keys
3. Monitor script execution logs
4. Review access permissions
5. Use strong passwords
6. Enable 2FA where possible
