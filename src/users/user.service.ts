@Injectable({ providedIn: 'root' })
export class UserService {

  private http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  create(user: User) {
    return this.http.post<User>('/api/users', user);
  }

  update(user: User) {
    return this.http.put<User>(`/api/users/${user.id}`, user);
  }
}
