import axios from 'axios';

function AddNewAcc() {
    
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        // console.log(data);

        axios.post('/api/account', data)
            .then(resp => console.log(resp));
    }

    return (
        <>
            <h1>Pridėti naują sąskaitą:</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label text-start" htmlFor='name'>Vardas:</label>
                        <input className="form-control" type="text" name="firstName" id='name'/>
                    </div>
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label" htmlFor='lastName'>Pavardė:</label>
                        <input className="form-control" type="text" name="lastName" id='lastName'/>
                    </div>
                </div>
                <div className="row">
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label" htmlFor='persNr'>Asmens kodas:</label>
                        <input className="form-control" type="number" name="persNr" id='persNr'/>
                    </div>
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label" htmlFor='photo'>Id nuotrauka:</label>
                        <input className="form-control" type="file" accept="image/jpeg" name="docPhoto" id='photo'/>
                    </div>
                </div>
                <div className="mt-2">
                <button className="btn btn-primary">Pridėti</button>
                </div>
            </form>
        </>
    );
}
export default AddNewAcc;