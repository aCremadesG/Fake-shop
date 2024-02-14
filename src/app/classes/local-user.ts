import { JwtTokens } from "../interfaces/jwt-tokens";
import { User } from "../interfaces/user";

export class LocalUser {
    private userToken: JwtTokens = {}
    private userProfile: User = {}

    setTokens(token: JwtTokens){
        this.userToken = token;
    }

    get returnTokens(): JwtTokens{
        return this.userToken;
    }

    setUser(userData: User){
        this.userProfile = userData;
    }

    get returnUser(): User{
        return this.userProfile;
    }
}
