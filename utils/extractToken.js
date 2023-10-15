const extratToken = (token) => {
  try {
    if (!token) {
      return {
        status: 400,
        message: "no-token-provided",
      };
    } else {
      if (!token.startsWith("Bearer ")) {
        return {
          status: 401,
          message: "invalid-authorization-format",
        };
      } else {
        const extractedToken = token.slice(7);
        if (!extractedToken) {
          return {
            status: 401,
            message: "invalid-authorization-format",
          };
        } else {
          return {
            status: 200,
            message: "token-extracted",
            data: {
              token: extractedToken,
            },
          };
        }
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};

module.exports = extratToken;
