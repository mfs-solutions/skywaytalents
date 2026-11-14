#!/bin/bash

# AWS Amplify Setup Script for Sky Way Talents
# This script automates the Amplify initialization and deployment

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     AWS Amplify Deployment - Sky Way Talents                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v amplify &> /dev/null; then
    echo "❌ Amplify CLI not found. Installing..."
    npm install -g @aws-amplify/cli
fi

if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Installing..."
    pip install awscli
fi

echo "✅ Prerequisites checked"
echo ""

# Check AWS credentials
echo "🔑 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured"
    echo "Please run: aws configure"
    exit 1
fi
echo "✅ AWS credentials valid"
echo ""

# Build the application
echo "🏗️  Building application..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

# Check if Amplify is already initialized
if [ -d "amplify" ]; then
    echo "✅ Amplify already initialized"
else
    echo "🚀 Initializing Amplify..."
    amplify init \
        --amplify '{"projectName":"skywaytalents","envName":"prod","defaultEditor":"vscode"}' \
        --providers '{"awscloudformation":{"AuthRoleName":"amplify-skywaytalents-prod-authRole","UnauthRoleArn":"","AuthRoleArn":""}}' \
        --yes
fi
echo ""

# Add hosting if not already added
if [ -d "amplify/backend/hosting" ]; then
    echo "✅ Hosting already configured"
else
    echo "📱 Adding hosting..."
    amplify add hosting --yes
fi
echo ""

# Deploy
echo "🚀 Deploying to AWS Amplify..."
amplify publish --yes

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  DEPLOYMENT SUCCESSFUL! 🎉                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📍 Your application is now live!"
echo "   Check AWS Amplify Console for your live URL"
echo ""
echo "Next steps:"
echo "  1. View deployment: amplify status"
echo "  2. View logs: amplify logs -c hosting --follow"
echo "  3. Add custom domain: amplify add custom-domain"
echo ""
