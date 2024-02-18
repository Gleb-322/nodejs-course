const F = async () => {
	const pass = 'Redfg123!'

	const hashedPass = await bcrypt.hash(pass, 8)

	console.log(pass)
	console.log(hashedPass)

	const isMatches = await bcrypt.compare(pass, hashedPass)
	console.log(isMatches)
}
F()
