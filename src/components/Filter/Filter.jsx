import s from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.data}
          type="text"
          value={value}
          onChange={e => onChangeFilter(e.target.value)}
        />
      </label>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
