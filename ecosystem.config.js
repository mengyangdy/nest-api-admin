module.export = {
  apps: [
    {
      name: "nest-server",
      script: "./dist/src/main.js",
      exec_mode: "cluster",
      instances: "max",
      max_memory_restart: "250M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/app-err.log",
      out_file: "./logs/app-out.log",
      merge_logs: true,
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
