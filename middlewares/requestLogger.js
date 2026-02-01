/* eslint-disable no-console */
export const requestLogger = (req, res, next) => {
  const { method, originalUrl, headers, body, query, params } = req;
  const timestamp = new Date().toISOString();

  console.log('--- Incoming Request ---');
  console.log(`Time: ${timestamp}`);
  console.log(`Method: ${method}`);
  console.log(`URL: ${originalUrl}`);
  console.log('Headers:', headers);
  if (Object.keys(query).length) console.log('Query:', query);
  if (Object.keys(params).length) console.log('Params:', params);
  if (Object.keys(body).length) console.log('Body:', body);
  console.log('------------------------');

  next();
};
