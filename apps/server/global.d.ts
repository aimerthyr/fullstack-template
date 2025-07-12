declare namespace NodeJS {
  /** 注意这里的所有类型都是字符串，需要自己手动在使用的地方改成对应的类型 */
  type ProcessEnv = {
    NODE_ENV: 'development' | 'production';
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  };
}
