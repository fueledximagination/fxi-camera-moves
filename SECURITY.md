# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security problems. Report them privately, either way works:

- GitHub private vulnerability reporting: "Report a vulnerability" under this repository's **Security** tab, or
- email **contact@fxi.studio** with "SECURITY: fxi-camera-moves" in the subject.

You should get a response within a few days.

## Scope

This repository is a static dataset plus a small, dependency-free build and validation script. It makes no network requests at build or test time. The example clip and poster URLs point at `https://assets.fxi.studio`; if one of them serves something unexpected, report it the same way.

## Supported versions

Only the latest release receives fixes.
