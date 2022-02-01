import NumberInput from '../../customInputs/NumberInput';

export const InvoiceNewUI = ({handleSubmit, onChangeTotal}) => {
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <NumberInput label='Total' changeCallback={onChangeTotal}/>
            <div>
              <button type="submit">Add</button>
            </div>
            <Link to="/login">Back</Link>
          </form>
        </div>
      )
}