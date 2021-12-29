import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "124525",
      email: "jawkagfon@iftiwup.cn",
      name: "Sylvia Morgan",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("jawkagfon@iftiwup.cn");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ti@lojopam.ls")
    ).rejects.toEqual(new AppError("User does not exist!"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    usersRepositoryInMemory.create({
      driver_license: "901667",
      email: "valdadedi@lijroz.nz",
      name: "Celia Zimmerman",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("valdadedi@lijroz.nz");

    expect(generateTokenMail).toBeCalled();
  });
});
