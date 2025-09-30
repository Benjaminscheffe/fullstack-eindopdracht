function ProfileTab({ user, error }) {
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
                    </ul>
                </> : <p>User details not available</p>
            }

            {error && <p>Something went wrong, please try again.</p>}
        </>

    );
}

export default ProfileTab;