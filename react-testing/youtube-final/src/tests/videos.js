const videoStub = {
  id: 1,
  snippet: {
    title: "title",
    channelId: "1",
    channelTitle: "channelTitle",
    publishedAt: new Date(),
    thumbnails: {
      medium: {
        url: "http://image/",
      },
    },
  },
};

const videosStub = [
  {
    id: 1,
    snippet: {
      title: "title",
      channelId: "1",
      channelTitle: "channelTitle",
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: "http://image/",
        },
      },
    },
  },
  {
    id: 2,
    snippet: {
      title: "title2",
      channelId: "2",
      channelTitle: "channelTitle2",
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: "http://image/2",
        },
      },
    },
  },
];

export { videoStub, videosStub };
