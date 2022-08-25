import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './followmodal.css'
import FollowButton from "../FollowButton"
import defaultProfilePic from '../../../Images/defaultprofilepic.svg'


export default function ShowFollows({ type, setShowModal }) {
    const { userId } = useParams()
    const profileUser = useSelector(state => state.users[Number(userId)])
    const sessionUserId = useSelector(state => state.session.user.id)
    const sessionUser = useSelector(state => state.users[sessionUserId])
    const users = useSelector(state => state.users)

    const [following, setFollowing] = useState(false)
    const [displayItems, setDisplayItems] = useState([])
    const [header, setHeader] = useState('')

    useEffect(() => {
        setFollowing(sessionUser.following.includes(profileUser.id))
    }, [sessionUser, profileUser])

    useEffect(() => {
        if (type === 'followers') {
            setDisplayItems(profileUser?.followers)
            setHeader('Followers')
        } else {
            setDisplayItems(profileUser?.following)
            setHeader('Following')
        }
    }, [profileUser])

    return (
        <div className="main-follows-container">
            <div className="follows-container-header">
                <div>
                    <div className="follows-container-title">{header}</div>
                </div>
                <div className="close-modal-x">
                    <button onClick={() => setShowModal(false)} className="x">X</button>
                </div>
            </div>
            <div className="follow-cards-container">
                {displayItems &&
                    displayItems.map(user => (
                        <div key={user} className="follow-card">
                            <div className="follow-card-pic">
                                {user.avatar || <img src={defaultProfilePic} alt=""></img>}
                            </div>
                            <div className="follow-card-name-container">
                                <div className="follow-card-username">{users[user].username}</div>
                                <div className="follow-card-real-name">real name</div>
                            </div>
                            {sessionUserId !== user &&
                                <FollowButton profileUserId={user} following={sessionUser.following.includes(user)} />}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
