const config = {
  development: {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  },
  production: {
    apiBaseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/prod",
  },
};

const environment = import.meta.env.VITE_APP_ENV || "development";

export default config[environment];
