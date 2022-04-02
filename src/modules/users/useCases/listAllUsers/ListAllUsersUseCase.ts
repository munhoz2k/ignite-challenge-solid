import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userInfos = this.usersRepository.findById(user_id);

    if (!userInfos) {
      throw new Error("User not found!");
    }
    if (!userInfos.admin) {
      throw new Error("Can't list users for a non admin user!");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
