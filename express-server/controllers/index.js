export * from "./test-controllers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post, User } from "../database/index.js";

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, password: hashedPassword });
            await user.save();
            return res.status(201).json({ message: "User registered successfully. Please Login." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Internal server error." });

    }
}

export const getUsersController = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Error Fetching Users!" });
    }
}

export const createPostCotroller = async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(401).json({ message: "Title, Content and Author are required" });
    }
    try {
        const post = new Post({ title, content, author, authorId: req.userId, comments: [] })
        await post.save()
        return res.status(201).json({ message: "Post Created successfully." });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Error Creating Post!" });
    }
}

export const getAllPostsController = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Error Fetching All Posts!" });
    }
}

export const getSpecificPostController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(401).json({ message: "Post Not Found." });
        }
        res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Error Fetching A Post!" });
    }
}

export const editPostController = async (req, res) => {
    const { title, content, author } = req.body
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(401).json({ message: "Post Not Found." });
        }
        if (post.authorId.toString() !== req.userId) {
            return res.status(403).json({ message: "You are Not Authorized to edit this post." });
        }
        if (title) post.title = title
        if (content) post.content = content
        if (author) post.author = author
        await post.save()
        res.status(201).json({ message: "Post Updated successfully." });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Error Editing A Post!" });
    }
}

export const deletePostController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(401).json({ message: "Post Not Found." });
        }
        if (post.authorId.toString() !== req.userId) {
            return res.status(403).json({ message: "You are Not Authorized to delete this post." });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Post Deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Error Deleting A Post!" });
    }
}

export const commentPostController = async (req, res) => {
    const { commenter, comment } = req.body

    if (!commenter || !comment) {
        return res.status(401).json({ message: "Commenter and Comment are required" });
    }
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(401).json({ message: "Post Not Found." });
        }
        post.comments.push({ commenter, comment })
        await post.save()
        res.status(201).json({ message: "Comment Added successfully." });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Error Commenting In A Post!" });
    }
}