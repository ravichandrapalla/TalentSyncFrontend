const config = {
  development: {
    apiBaseUrl: "http://localhost:4000",
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
  },
  production: {
    apiBaseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/prod",
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
  },
};

const environment = import.meta.env.VITE_APP_ENV || "development";

export default config[environment];
