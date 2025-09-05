function ProfileTab({ user }) {

    return (
        <>
            { Object.keys(user).length > 0 ?
                <>
                    <h2>Welcome {user.username}</h2>
                    <p>Long time no see, it's cooking time. Dream big and make those hits!!</p>
                    <ul>
                        <li className="flexBox justify-content-flex-start">
                            <div className="flex-40 font-weight-500">Email</div>
                            <div className="flex-60">{user.email}</div>
                        </li>
                        <li className="flexBox justify-content-flex-start">
                            <div className="flex-40 font-weight-500">Username</div>
                            <div className="flex-60">{user.username}</div>
                        </li>
                        <li className="flexBox justify-content-flex-start">
                            <div className="flex-40 font-weight-500">Firstname</div>
                            <div className="flex-60">Slim</div>
                        </li>
                        <li className="flexBox justify-content-flex-start">
                            <div className="flex-40 font-weight-500">Password</div>
                            <div className="flex-60">{user.password
                            }</div>
                        </li>

                    </ul>
                </> : <p>User details not available</p>
            }
        </>

    );
}

export default ProfileTab;