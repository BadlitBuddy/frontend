export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    register: {
      path: "/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    login: {
      path: "/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },

  app: {
    dashboard: {
      path: "dashboard",
      getHref: () => "/dashboard",
    },
    settings: {
      path: "settings",
      getHref: () => "/settings",
    },
    transcripts: {
      path: "transcripts",
      getHref: () => `transcripts`,
    },
    transcript: {
      path: "transcripts/:transcriptId",
      getHref: (id: string) => `/transcripts/${id}`,
    },
  },
} as const;
