function Login() {
    return (
        <>
            <h1>Login page</h1>

            <form >
                <div className="row my-5">
                    <div className="col-12 col-md-6">
                        <label className="d-block mb-2" htmlFor="email">El. pašto adresas:</label>
                        <input className="form-control" type="email" name="email" id="email" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="d-block mb-2" htmlFor="password">Slaptažodis:</label>
                        <input className="form-control" type="password" name="password" id="password" />
                    </div>
                </div>
                <button className="btn btn-primary">Prisijungti</button>
            </form>
        </>
    );
}
export default Login;