#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const targetUrl = process.env.APP_URL || 'http://localhost:3000';

function printHelp() {
  console.log('一键启动脚本');
  console.log('用法: node scripts/start-dev.js [--help]');
  console.log('可选环境变量: APP_URL (默认 http://localhost:3000)');
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  printHelp();
  process.exit(0);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: false,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }
  if (typeof result.status === 'number' && result.status !== 0) {
    throw new Error(`命令执行失败: ${command} ${args.join(' ')}`);
  }
}

function openBrowser(url) {
  let cmd;
  let args;

  if (isWindows) {
    cmd = 'cmd';
    args = ['/c', 'start', '', url];
  } else if (process.platform === 'darwin') {
    cmd = 'open';
    args = [url];
  } else {
    cmd = 'xdg-open';
    args = [url];
  }

  const opened = spawn(cmd, args, {
    cwd: projectRoot,
    stdio: 'ignore',
    detached: true,
  });

  opened.on('error', () => {
    console.warn(`⚠️ 无法自动打开浏览器，请手动访问: ${url}`);
  });

  opened.unref();
}

function ensureDependencies() {
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    return;
  }

  console.log('📦 检测到首次运行，正在安装依赖（npm install）...');
  run(npmCmd, ['install']);
}

function startDevServer() {
  console.log('🚀 正在启动开发服务器（npm run dev）...');

  const child = spawn(npmCmd, ['run', 'dev'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: isWindows,
  });

  let browserOpened = false;
  const timer = setInterval(() => {
    if (!browserOpened) {
      browserOpened = true;
      openBrowser(targetUrl);
      console.log(`🌐 已尝试打开浏览器: ${targetUrl}`);
      clearInterval(timer);
    }
  }, 2500);

  child.on('close', (code) => {
    clearInterval(timer);
    process.exit(code ?? 0);
  });

  child.on('error', (err) => {
    clearInterval(timer);
    console.error('❌ 启动失败:', err.message);
    process.exit(1);
  });

  process.on('SIGINT', () => child.kill('SIGINT'));
  process.on('SIGTERM', () => child.kill('SIGTERM'));
}

try {
  process.chdir(projectRoot);
  ensureDependencies();
  startDevServer();
} catch (err) {
  const message = err instanceof Error ? err.message : '未知错误';
  console.error('❌ 一键启动失败:', message);
  process.exit(1);
}
