import { useState } from "react"

const initialState = { title: '', description: '', assignedTo: [], dueDate: '' }
const members = [{ _id: 1, username: 'hawra' }, { _id: 2, username: 'mohammed' },
{ _id: 3, username: 'hissa' }
]
function TaskForm() {
    const [formData, setFormData] = useState(initialState);
    const [selectedMember, setSelectedMember] = useState('');

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault();
    }
    function addMember() {
        setFormData({ ...formData, assignedTo: [...formData.assignedTo, selectedMember] })
        setSelectedMember('');

    }
    function removeMember(removeMember) {
        const updatedMembers = formData.assignedTo.filter((member) => member !== removeMember)
        setFormData({ ...formData, assignedTo: updatedMembers })

    }
    return (<form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input onChange={handleChange} value={formData.title} name='title' type="text" className="form-control" id="title" placeholder="add a title..." />
        </div>
        <div className="form-group">
            <label htmlFor="description">Example textarea</label>
            <textarea onChange={handleChange} value={formData.description} name='description' className="form-control" id="description" rows="3"></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="assignedTo">Assigned to:</label>
            <select onChange={(e) => setSelectedMember(e.target.value)} value={selectedMember} className="form-select" aria-label="assignedTo">
                <option>Choose a member</option>
                {members
                    .filter((member) => !formData.assignedTo.includes(member._id))
                    .map((member) => (
                        <option key={member._id} value={member._id}>
                            {member.username}
                        </option>
                    ))}
            </select>
            <button type="button" onClick={addMember} className='btn btn-success'>Add</button>
            {formData.assignedTo.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                    {formData.assignedTo.map((member) => {
                        return (<span key={member._id} className="badge text-bg-secondary d-flex align-items-center gap-1">
                            {member}
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                style={{ fontSize: '0.6rem' }}
                                aria-label={`Remove ${member}`}
                                onClick={() => removeMember(member)}
                            ></button>
                        </span>
                        )
                    })}</div>)}

        </div>
        <div className="d-flex justify-content-center">
            <div
                className="border rounded"
                data-coreui-locale="en-US"
                data-coreui-start-date="2024/02/13"
                data-coreui-toggle="calendar"
            ></div>
        </div>

    </form>)

}
export default TaskForm