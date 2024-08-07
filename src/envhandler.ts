// get the environment variable
const getEnvVariable = (key: string | number) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

// Declare variables
let PORT: Number;
let DATABASE_URL: string;
// Validate the environment variables
try {
  PORT = parseInt(getEnvVariable("PORT"), 10);
  DATABASE_URL = getEnvVariable("DATABASE_URL");
} catch (error: any) {
  console.error(error.message);
  process.exit(1);
}

// Export the variables after validation
export { PORT, DATABASE_URL };
