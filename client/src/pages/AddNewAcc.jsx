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
                        <label className="form-label text-start">Vardas:</label>
                        <input className="form-control" type="text" name="firstName" />
                    </div>
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label">Pavardė:</label>
                        <input className="form-control" type="text" name="lastName" />
                    </div>
                </div>
                <div className="row">
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label">Asmens kodas:</label>
                        <input className="form-control" type="number" name="persNr" />
                    </div>
                    <div className="mt-2 col-12 col-md-6">
                        <label className="form-label">Id nuotrauka:</label>
                        <input className="form-control" type="file" accept="image/jpeg" name="docPhoto" />
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