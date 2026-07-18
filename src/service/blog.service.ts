const blogService = {
  getBlogs: async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=1da81ec744504e2f8718866e131c647a`,
      );
      const data = await res.json();

      return data.articles;
    } catch (err) {
      return {
        data: null,
        error: err,
      };
    }
  },
};

export default blogService;
