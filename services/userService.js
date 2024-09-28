/** @format */

const userRepository = require('../repositories/userRepository');
const { ValidationError } = require('sequelize');

const getAllUsers = async () => {
	return await userRepository.findAll();
};
const getUserById = async (id) => {
	return await userRepository.findOne({ where: { id } });
};
const findByEmailAndPassword = async (email, password) => {
	const user = await userRepository.findOne({
		where: { email, password },
	});
	if (!user) {
		throw new ValidationError('User not found');
	}

	if (user.password !== password) {
		throw new ValidationError('User not found');
	}

	return user;
};

const createUser = async (userData) => {
	const { firstName, lastName, email, password, phone } = userData;

	// Validate non-empty fields
	if (!firstName || !firstName.trim()) {
		throw new ValidationError('First name cannot be empty.');
	}

	if (!lastName || !lastName.trim()) {
		throw new ValidationError('Last name cannot be empty.');
	}

	if (!email || !email.trim()) {
		throw new ValidationError('Email cannot be empty.');
	}

	if (!password || password.length < 6) {
		throw new ValidationError('Password must be at least 6 characters long.');
	}

	if (!phone || !phone.trim()) {
		throw new ValidationError('Phone number cannot be empty.');
	}

	// Check if email already exists
	const existingUser = await userRepository.findOne({ where: { email } });
	if (existingUser) {
		throw new ValidationError('Email is already registered.');
	}

	// If all validations pass, create the user
	return await userRepository.create(userData);
};

const updateUser = async (id, userData) => {
	const user = await userRepository.findOne({ where: { id } });
	if (!user) {
		throw new ValidationError('User not found');
	}

	const [affectedRows, [updatedUser]] = await userRepository.update(
		id,
		userData,
	);

	if (affectedRows === 0) {
		throw new ValidationError('Update failed');
	}

	return updatedUser;
};

module.exports = {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	findByEmailAndPassword,
};
