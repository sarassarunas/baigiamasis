import './SingleAccount.css';

function SingleAccount(props) {
    return (
        <>
            <div className="row justify-content-md-center">
                <div className="col-12 col-md-8 ">
                    <div className="accInfo row">
                        <div className="name col-12 col-md-6">
                            <label className='d-block'>Vartotojo vardas, pavardė</label>
                            <span>{props.firstName+' '+props.lastName}</span>
                        </div>
                        <div className="balance col-12 col-md-6">
                            <label className='d-block'>Sąskaitos likutis:</label>
                            <span>{props.balance+' €'}</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default SingleAccount;