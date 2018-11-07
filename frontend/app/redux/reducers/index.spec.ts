import { currentUserReducer } from './user/current-user.reducer';
import { LoginUser } from '../actions/user/user.actions';
import { UserCredentials } from '../../user-list/user-service.interface';

describe('Login current user with name and password', () => {
  test('should start loading', () => {
    const user: UserCredentials = {
      name: 'Medinsky',
      password: '1'
    };

    const result = currentUserReducer(undefined, new LoginUser(user));

    expect(result).toMatchSnapshot();
  });
});
