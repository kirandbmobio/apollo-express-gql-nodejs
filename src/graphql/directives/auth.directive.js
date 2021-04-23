import { defaultFieldResolver } from "graphql";

import { ApolloError, SchemaDirectiveVisitor } from "apollo-server-express";

// export class isAuthDirective extends SchemaDirectiveVisitor {

//     // const { resolve = defaultFieldResolver } = field;
//     // field.resolve = async function (...args) {
//     //   let [_, {}, { user, isAuth }] = args;
//     //   console.log("test", isAuth, user);
//     // };
//   }
// }

export class isAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      let [
        _,
        {},
        {
          req: {
            req: { isAuth, user },
          },
        },
      ] = args;
      console.log(isAuth, user);
      if (isAuth) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new ApolloError(
          "You must be authenticated user to get this information."
        );
      }
    };
  }
}
