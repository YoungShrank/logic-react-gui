// This is the code for the Poser component.
// It is used to display the position and size 
//relative to the parent component (or default pose)
//of the View component.

/**
 * 
 * @param {*} pose 姿态（位置和大小），用margin控制
 */
function Poser(props) {
    const view = props.children
    const pose = props.pose
    const style = {
    }
    if (pose) {
        if (pose.top) {
            style.marginTop = pose.top
        }
        if (pose.left) {
            style.marginLeft = pose.left
        }
        if (pose.left) {
            style.marginRight = pose.right
        }
        if (pose.top) {
            style.marginBottom = pose.bottom
        }
    }
    return <div style={style}>{view}</div>
}

export default Poser