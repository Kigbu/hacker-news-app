export const newStoriesUrl = `/topstories.json?print=pretty`;

const getTopStories = async (
  client: any,
  page: number,
  limit: number
): Promise<number[]> => {
  try {
    const response = await client.get(newStoriesUrl);
    // console.log("response :>> ", response);

    if (response.ok && Array.isArray(response.data)) {
      const start = (page - 1) * limit;
      const end = page * limit;
      return response.data.slice(start, end);
    } else {
      throw new Error("Failed to fetch stories");
    }
  } catch (error) {
    console.error("Error fetching top stories:", error);
    return [];
  }
};

const getStory = async (client: any, id: number) => {
  return await client.get(`/item/${id}.json`);
};

const newsService = {
  getTopStories,
  getStory,
};

export default newsService;
