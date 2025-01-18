import './Account.css';

function Account(props) {
    return(
        <>
            <div className="row border border-start-0 border-end-0 mt-3">
                <div className="col-12 col-md-8 my-2">
                    <div className="row">
                        <div className="info col-12 col-md-4 text-start">
                            <div className="name mt-1">
                                <label className="d-block">Vartotojas:</label>
                                <span className="d-block">{props.firstName + ' ' + props.lastName}</span>
                            </div>
                            <div className="persNr mt-1">
                                <label className="d-block">Asmens kodas:</label>
                                <span className="d-block">{props.persNr}</span>
                            </div>
                            <div className="acc mt-1">
                                <label className="d-block">Sąskaitos Nr:</label>
                                <span className="d-block">{props.accNr}</span>
                            </div>
                        </div>
                        <div className="balance col-12 col-md-4">
                        <label className="d-block">Sąskaitos balansas:</label>
                        <span className="d-block">{props.balance + ' €'}</span>
                        </div>
                        <div className="photo col-12 col-md-4">
                            <img src={"/docPhoto/" + props.docPhoto} alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 border-start">
                    <div className="buttons my-2">
                        <button className="btn btn-primary">1 button</button>
                        <button className="btn btn-danger">Ištrinti</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Account;