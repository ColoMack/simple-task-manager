exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email }});
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid Credentials' });

        // generate jwt token using user's ID
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error('Login Error. ', error);
        res.status(500).json({ message: 'Server error' });
    }
};