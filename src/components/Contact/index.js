import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const Home = () => (
    <>
        <Header />
        <div className='main-layout'>
            <div className='sidebar-layout'>
                <Sidebar />
            </div>
            <div className='component-layout'>
                <div style={{width:"90%", overflowX:"scroll", height:"85vh"}}>
                    <h1 className="heading">Contact Information</h1>
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>1234567890</td>
                                    <td>john@example.com</td>
                                    <td>Inquiry</td>
                                    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>9876543210</td>
                                    <td>jane@example.com</td>
                                    <td>Feedback</td>
                                    <td>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </>
)
export default Home