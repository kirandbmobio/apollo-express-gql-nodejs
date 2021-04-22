import { parse, join } from "path";
import { createWriteStream } from "fs";

import { URL } from "../../config";

export default {
  Query: {
    info: () => "Hello I am image resolver methods",
  },
  Mutation: {
    imageUploader: async (_, { file }) => {
      try {
        let { filename, createReadStream } = await file;
        let stream = createReadStream();

        let { ext, name } = parse(filename);

        name = name.replace(/([^a-z0-9 ]+)/gi, "-").replace(" ", "_");

        let serverFile = join(
          __dirname,
          `../../uploads/${name}-${Date.now()}${ext}`
        );

        let writeStream = await createWriteStream(serverFile);
        await stream.pipe(writeStream);
        serverFile = `${URL}${serverFile.split("uploads")[1]}`;
        return serverFile;
      } catch (err) {
        return err;
      }
    },
  },
};
