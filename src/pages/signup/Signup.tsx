import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Truck, ArrowLeft } from "lucide-react";
import { AnimatedParticles } from "@/components/home/particles";

export default function CadastroPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Estados para empresa
  const [empresaData, setEmpresaData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    endereco: "",
    telefone: "",
    email: "",
    senha: "",
  });

  // Estados para motoboy
  const [motoboyData, setMotoboyData] = useState({
    nomeCompleto: "",
    cpf: "",
    telefone: "",
    endereco: "",
    cnh: "",
    email: "",
    senha: "",
  });

  const handleEmpresaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação básica
    if (
      !empresaData.nomeEmpresa ||
      !empresaData.cnpj ||
      !empresaData.email ||
      !empresaData.senha
    ) {
      setError("Por favor, preencha todos os campos obrigatórios");
      setLoading(false);
      return;
    }

    // Simulação de cadastro
    setTimeout(() => {
      setSuccess("Empresa cadastrada com sucesso! Redirecionando...");
      setTimeout(() => {
        // router.push("/")
      }, 2000);
      setLoading(false);
    }, 1000);
  };

  const handleMotoboySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação básica
    if (
      !motoboyData.nomeCompleto ||
      !motoboyData.cpf ||
      !motoboyData.cnh ||
      !motoboyData.email ||
      !motoboyData.senha
    ) {
      setError("Por favor, preencha todos os campos obrigatórios");
      setLoading(false);
      return;
    }

    // Simulação de cadastro
    setTimeout(() => {
      setSuccess("Motoboy cadastrado com sucesso! Redirecionando...");
      setTimeout(() => {
        // router.push("/")
      }, 2000);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
        <div className="absolute top-0 left-0 w-full h-full z-10">
            <div className="min-h-screen p-4">
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <a
                    href="/"
                    className="inline-flex items-center text-white no-underline hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao login
                  </a>
                </div>

                {/* <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Cadastro
                  </h1>
                  <p className="text-gray-600">
                    Escolha o tipo de conta que deseja criar
                  </p>
                </div> */}

                {success && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <AlertDescription className="text-green-800">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Criar Nova Conta</CardTitle>
                    <CardDescription>
                      Preencha os dados para se cadastrar na plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="empresa" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="empresa"
                          className="flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4" />
                          Empresa
                        </TabsTrigger>
                        <TabsTrigger
                          value="motoboy"
                          className="flex items-center gap-2"
                        >
                          <Truck className="h-4 w-4" />
                          Motoboy
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="empresa">
                        <form
                          onSubmit={handleEmpresaSubmit}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nomeEmpresa">
                                Nome da Empresa *
                              </Label>
                              <Input
                                id="nomeEmpresa"
                                value={empresaData.nomeEmpresa}
                                onChange={(e) =>
                                  setEmpresaData({
                                    ...empresaData,
                                    nomeEmpresa: e.target.value,
                                  })
                                }
                                placeholder="Nome da sua empresa"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cnpj">CNPJ *</Label>
                              <Input
                                id="cnpj"
                                value={empresaData.cnpj}
                                onChange={(e) =>
                                  setEmpresaData({
                                    ...empresaData,
                                    cnpj: e.target.value,
                                  })
                                }
                                placeholder="00.000.000/0000-00"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="endereco">Endereço Completo</Label>
                            <Input
                              id="endereco"
                              value={empresaData.endereco}
                              onChange={(e) =>
                                setEmpresaData({
                                  ...empresaData,
                                  endereco: e.target.value,
                                })
                              }
                              placeholder="Rua, número, bairro, cidade, CEP"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="telefoneEmpresa">Telefone</Label>
                              <Input
                                id="telefoneEmpresa"
                                value={empresaData.telefone}
                                onChange={(e) =>
                                  setEmpresaData({
                                    ...empresaData,
                                    telefone: e.target.value,
                                  })
                                }
                                placeholder="(11) 99999-9999"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emailEmpresa">E-mail *</Label>
                              <Input
                                id="emailEmpresa"
                                type="email"
                                value={empresaData.email}
                                onChange={(e) =>
                                  setEmpresaData({
                                    ...empresaData,
                                    email: e.target.value,
                                  })
                                }
                                placeholder="empresa@email.com"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="senhaEmpresa">Senha *</Label>
                            <Input
                              id="senhaEmpresa"
                              type="password"
                              value={empresaData.senha}
                              onChange={(e) =>
                                setEmpresaData({
                                  ...empresaData,
                                  senha: e.target.value,
                                })
                              }
                              placeholder="Mínimo 6 caracteres"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                          >
                            {loading ? "Cadastrando..." : "Cadastrar Empresa"}
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="motoboy">
                        <form
                          onSubmit={handleMotoboySubmit}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nomeCompleto">
                                Nome Completo *
                              </Label>
                              <Input
                                id="nomeCompleto"
                                value={motoboyData.nomeCompleto}
                                onChange={(e) =>
                                  setMotoboyData({
                                    ...motoboyData,
                                    nomeCompleto: e.target.value,
                                  })
                                }
                                placeholder="Seu nome completo"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cpf">CPF *</Label>
                              <Input
                                id="cpf"
                                value={motoboyData.cpf}
                                onChange={(e) =>
                                  setMotoboyData({
                                    ...motoboyData,
                                    cpf: e.target.value,
                                  })
                                }
                                placeholder="000.000.000-00"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="telefoneMotoboy">Telefone</Label>
                              <Input
                                id="telefoneMotoboy"
                                value={motoboyData.telefone}
                                onChange={(e) =>
                                  setMotoboyData({
                                    ...motoboyData,
                                    telefone: e.target.value,
                                  })
                                }
                                placeholder="(11) 99999-9999"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cnh">CNH *</Label>
                              <Input
                                id="cnh"
                                value={motoboyData.cnh}
                                onChange={(e) =>
                                  setMotoboyData({
                                    ...motoboyData,
                                    cnh: e.target.value,
                                  })
                                }
                                placeholder="Número da CNH"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="enderecoMotoboy">Endereço</Label>
                            <Input
                              id="enderecoMotoboy"
                              value={motoboyData.endereco}
                              onChange={(e) =>
                                setMotoboyData({
                                  ...motoboyData,
                                  endereco: e.target.value,
                                })
                              }
                              placeholder="Rua, número, bairro, cidade, CEP"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="emailMotoboy">E-mail *</Label>
                              <Input
                                id="emailMotoboy"
                                type="email"
                                value={motoboyData.email}
                                onChange={(e) =>
                                  setMotoboyData({
                                    ...motoboyData,
                                    email: e.target.value,
                                  })
                                }
                                placeholder="motoboy@email.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="senhaMotoboy">Senha *</Label>
                              <Input
                                id="senhaMotoboy"
                                type="password"
                                value={motoboyData.senha}
                                onChange={(e) =>
                                  setMotoboyData({
                                    ...motoboyData,
                                    senha: e.target.value,
                                  })
                                }
                                placeholder="Mínimo 6 caracteres"
                              />
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                          >
                            {loading ? "Cadastrando..." : "Cadastrar Motoboy"}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="w-full bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex items-center justify-center relative overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
          }}
        >
          <AnimatedParticles />
        </div>
      </div>
    </div>
  );
}
