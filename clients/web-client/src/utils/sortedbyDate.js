import dayjs from "dayjs";

export const sortedByDate = (data) =>
    data.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
