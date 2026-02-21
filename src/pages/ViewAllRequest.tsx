import { useMemo, useState } from 'react';
import { usePetDataStore } from '../context/Store/Provider';
import { useAuth } from '../context/Auth';
import './ViewAllRequest.css';

type UnifiedRecord = {
  id: string;
  petId: string;
  type: 'Adoption' | 'Rehome';
  fullname: string;
  email: string;
  phoneNumber: string;
  date: string;
  reason?: string;
};

export function ViewAllRequestPage() {
  useAuth({ allowedRoles: ['staff'] });
  const { rehomes, adoptions } = usePetDataStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Adoption' | 'Rehome'>(
    'All',
  );
  const [sortBy, setSortBy] = useState<'date' | 'fullname'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const data = useMemo<UnifiedRecord[]>(() => {
    const adoptionRows = adoptions.map(a => ({
      id: a.id,
      petId: a.petId,
      type: 'Adoption' as const,
      fullname: a.applicant.fullname,
      email: a.applicant.email,
      phoneNumber: a.applicant.phoneNumber,
      date: a.adoptionDate,
    }));

    const rehomeRows = rehomes.map(r => ({
      id: r.id,
      petId: r.petId,
      type: 'Rehome' as const,
      fullname: r.applicant.fullname,
      email: r.applicant.email,
      phoneNumber: r.applicant.phoneNumber,
      date: r.releaseDate,
      reason: r.reason,
    }));

    return [...adoptionRows, ...rehomeRows];
  }, [adoptions, rehomes]);

  const filteredSortedData = useMemo(() => {
    let result = [...data];

    if (typeFilter !== 'All') {
      result = result.filter(r => r.type === typeFilter);
    }

    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        r =>
          r.fullname.toLowerCase().includes(lower) ||
          r.email.toLowerCase().includes(lower) ||
          r.phoneNumber.includes(lower),
      );
    }

    result.sort((a, b) => {
      let compareValue = 0;

      if (sortBy === 'date') {
        compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        compareValue = a.fullname.localeCompare(b.fullname);
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return result;
  }, [data, search, typeFilter, sortBy, sortOrder]);

  return (
    <div>
      <h2>Adoptions & Rehomes</h2>

      <div className='controls'>
        <div className='formfield'>
          <label>Search Applicant</label>
          <input
            placeholder='Name, email or phone'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className='formfield'>
          <label>Type</label>
          <select
            value={typeFilter}
            onChange={e =>
              setTypeFilter(e.target.value as 'All' | 'Adoption' | 'Rehome')
            }
          >
            <option value='All'>All</option>
            <option value='Adoption'>Adoption</option>
            <option value='Rehome'>Rehome</option>
          </select>
        </div>

        <div className='formfield'>
          <label>Sort By</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'date' | 'fullname')}
          >
            <option value='date'>Date</option>
            <option value='fullname'>Applicant Name</option>
          </select>
        </div>
        <div className='formfield'>
          <label>Order</label>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </select>
        </div>
      </div>

      <table className='records-table'>
        <thead>
          <tr>
            <th>Type</th>
            <th>Pet ID</th>
            <th>Applicant</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {filteredSortedData.map(row => (
            <tr key={`${row.type}-${row.id}`}>
              <td>
                <span className={`badge ${row.type.toLowerCase()}`}>
                  {row.type}
                </span>
              </td>
              <td>{row.petId}</td>
              <td>{row.fullname}</td>
              <td>{row.email}</td>
              <td>{row.phoneNumber}</td>
              <td>{new Date(row.date).toLocaleDateString()}</td>
              <td>{row.reason ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
