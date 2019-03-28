import { injectable } from "inversify";
import { ensureLoggedIn } from "connect-ensure-login";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserRepository } from "./repository";
import { UserService } from "./service";

@injectable()
export class UserController {
  constructor(repo: UserRepository, service: UserService) {}
}

// Passport Authentiction
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await userService.login({ username, password });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);
passport.deserializeUser(async (username: string, done) => {
  const user = await userService.deserialize(username);
  done(null, user);
});
passport.serializeUser((user: User, done) => {
  const serializedUser = userService.serialize(user);
  done(null, serializedUser);
});

app.use(passport.initialize());
app.use(passport.session());

// Auth
const authName = config.models.auth.name;
app.post(`/${authName}/login`, passport.authenticate("local"), (req, res) => {
  res.status(200).json(req.user);
});
app.post(`/${authName}/logout`, (req, res) => {
  req.logout();
  res.sendStatus(200);
});

const authenticated = ensureLoggedIn(`${config.models.auth.client}/login`);
