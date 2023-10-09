const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

class ApiUtil {
  static search: string = `${API_ENDPOINT}/search`;
  static applyJob: string = `${API_ENDPOINT}/apply`;
}

export default ApiUtil;
