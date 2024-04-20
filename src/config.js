const config = {
  development: {
    apiBaseUrl: "http://localhost:4000",
    supabaseUrl: "https://quyrhcqiaavjfvchwjmv.supabase.co",
    supabaseKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eXJoY3FpYWF2amZ2Y2h3am12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1OTkwMjUsImV4cCI6MjAyOTE3NTAyNX0.KY9n1m7DrWcOvL4gwLNEwfLys2bS34flgODk27w3Ws0",
  },
  production: {
    apiBaseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/prod",
    supabaseUrl: "https://quyrhcqiaavjfvchwjmv.supabase.co",
    supabaseKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eXJoY3FpYWF2amZ2Y2h3am12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1OTkwMjUsImV4cCI6MjAyOTE3NTAyNX0.KY9n1m7DrWcOvL4gwLNEwfLys2bS34flgODk27w3Ws0",
  },
};

const environment = import.meta.env.VITE_APP_ENV || "development";

export default config[environment];
