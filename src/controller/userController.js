import passport from "passport";
import routes from "../routes";
import User from "../models/User";


export const getJoin = (req, res) => {
    res.render("Join", {pageTitle : "Join"});
};
export const postJoin = async (req, res, next) => {
    const{
        body : { name, email, password, password2} 
    } = req;
    if (password !== password2) {
        //상대코드 = status code http  라고 검색하면
        //웹사이트가 이해할 수 있는 http 로 바꾸어줌?
        res.status(400);
        res.render("join", {pageTitle : "join"});
    } else {
        try {
            const user = await User({
                name,
                email
            }); 
            await User.register(user, password);
            next();
        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => 
res.render("login", {pageTitle : "Loginnn"});

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
  });

export const githubLoign = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
    console.log(_, __, profile,cb);
    const {
        _json: {id, avartar_url: avatarUrl, name, email}
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);          
    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req,res) => {
    req.logout();
    res.redirect(routes.home);
};
export const users = (req,res) => res.render("users", {pageTitle : "Users"});

export const getMe = (req, res) => {
    res.render("userDetail", {pageTitle: "userDetail", user:req.user})
};

export const userDetail = async (req, res) => {
    const {
        params :{ id }
    } =req;
    try {
        //userDetail.pug에 videos 목록을 추가하기 위해 videos의 객체를 추가
        const user = await User.findById(req.user.id).populate("videos");
        console.log("req.user: " ,req.user);
        console.log("user.video: " ,user.video);
        console.log("user: ", user);
        res.render("userDetail", {pageTitle: "User Detail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => {
     res.render("editProfile", {pageTitle : "Edit Profile"});
};
export const postEditProfile = async (req, res) => {
    const {
        body: {name, email},
        file
    } = req;
    try{
    await User.findByIdAndUpdate(req.user.id, {
        name, 
        email,
        avatarUrl: file? file.location : req.user.avatarUrl
    });
    res.redirect(routes.me);
    } catch(error) {
        res.redirect(routes.editProfile);
    }
};
export const getChangePassword = (req, res) => { 
    res.render("changePassword", {pageTitle : "Change Password"});
};
export const postChangePassword = async (req, res) => {
    const {
        body : {oldPassword, newPassword, newPassword1}
    } = req;
    try {
        if(newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/user${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redierct(routes.me);
    } catch (error) {
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
};
// userRouter.get(routes.userDetail, (req, res) => res.send("User Detail"));
// userRouter.get(routes.editProfile, (req, res) => res.send("Edit Profile"));
// userRouter.get(routes.changePassword, (req, res) => res.send("Change Password"));