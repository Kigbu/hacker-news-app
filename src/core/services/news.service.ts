const getTopStories = async (
  client: any,
  page: number,
  limit: number,
): Promise<number[]> => {
  try {
    const response = await client.get(`/topstories.json?print=pretty`);
    // console.log("response :>> ", response);

    if (response.ok && Array.isArray(response.data)) {
      const start = (page - 1) * limit;
      const end = page * limit;
      return response.data.slice(start, end);
    } else {
      throw new Error('Failed to fetch stories');
    }
  } catch (error) {
    console.error('Error fetching top stories:', error);
    return [];
  }
};

const getStory = async (client: any, id: number) => {
  return await client.get(`/item/${id}.json`);
};

const getJobStories = async (
  client: any,
  page: number,
  limit: number,
): Promise<number[]> => {
  try {
    const response = await client.get(`/jobstories.json?print=pretty`);

    if (response.ok && Array.isArray(response.data)) {
      const start = (page - 1) * limit;
      const end = page * limit;
      return response.data.slice(start, end);
    } else {
      throw new Error('Failed to fetch stories');
    }
  } catch (error) {
    console.error('Error fetching top stories:', error);
    return [];
  }
};

const getJobStory = async (client: any, id: number) => {
  return await client.get(`/item/${id}.json`);
};

const newsService = {
  getTopStories,
  getStory,
  getJobStories,
  getJobStory,
};

export default newsService;
